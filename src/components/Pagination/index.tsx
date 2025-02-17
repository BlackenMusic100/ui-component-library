import { PaginationProps } from "./types"
import React, { useEffect, useState } from 'react'
import FirstPageIcon from '../../assets/icons/icon-firstpage-grey.svg'
import LastPageIcon from '../../assets/icons/icon-lastpage-grey.svg'
import NextPageIcon from '../../assets/icons/icon-next-grey.svg'
import PreviousPageIcon from '../../assets/icons/icon-prev-grey.svg'

const Button: React.FC<PaginationProps> = ({ ...props }) => {  
    const handlePaginationClick = props.onPaginationClick
  
    //default values
    const {
      boundaryCount = 0,
      disabled = false,
      hideNextButton = false,
      hidePrevButton = false,
      showFirstButton = true,
      showLastButton = true,
      siblingCount = 1,
      page = 1,
      paginationCount = 1,
    } = props;
  
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        const paginationContainer = document.querySelector<HTMLElement>('.pagination-container')!;
        const scrollPosition = window.scrollY + window.innerHeight;
        const offsetTop = paginationContainer.offsetTop;
  
        if (scrollPosition < offsetTop) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    const range = (start: number, end: number) => {
      if (start > end || start < 1 || end < 1) {
        return []; // Return an empty array if the range is invalid
      }
  
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    };
  
    const startPages: any[] = range(1, Math.min(boundaryCount, paginationCount));
    const endPages: any[] = range(Math.max(paginationCount - boundaryCount + 1, boundaryCount + 1), paginationCount);
  
    const siblingsStart = Math.max(
      Math.min(
        // Natural start
        page - siblingCount,
        // Lower boundary when page is high
        paginationCount - boundaryCount - siblingCount * 2 - 1,
      ),
      // Greater than startPages
      boundaryCount + 2,
    );
  
    const siblingsEnd = Math.min(
      Math.max(
        // Natural end
        page + siblingCount,
        // Upper boundary when page is low
        boundaryCount + siblingCount * 2 + 2,
      ),
      // Less than endPages
      endPages.length > 0 ? endPages[0] - 2 : paginationCount - 1,
    );
  
    const itemList = [
      ...(showFirstButton ? ['|<'] : []),
      ...(hidePrevButton ? [] : ['previous']),
      ...startPages,
  
      // Start ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsStart > boundaryCount + 2
        ? ['start-ellipsis']
        : boundaryCount + 1 < paginationCount - boundaryCount
          ? [boundaryCount + 1]
          : []),
  
      // Sibling pages
      ...range(siblingsStart, siblingsEnd),
  
      // End ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsEnd < paginationCount - boundaryCount - 1
        ? ['end-ellipsis']
        : paginationCount - boundaryCount > boundaryCount
          ? [paginationCount - boundaryCount]
          : []),
  
      ...endPages,
      ...(hideNextButton ? [] : ['next']),
      ...(showLastButton ? ['>|'] : []),
    ];
  
  
    const buttonPage = (type: string) => {
      switch (type) {
        case '|<':
          return 1;
        case 'previous':
          return page - 1;
        case 'next':
          return page + 1;
        case '>|':
          return paginationCount;
        default:
          return null;
      }
    };
  
    const items = itemList.map((item) => {
      if (typeof item === 'number') {
        return {
          onClick: (event: any) => {
            handlePaginationClick(event, item);
          },
          type: 'page',
          page: item,
          selected: item === page,
          disabled: disabled || item === page ? true : false,
          'aria-current': item === page ? true : undefined,
        };
      } else {
        let icon: any;
        switch (item) {
          case 'previous':
            icon = PreviousPageIcon;
            break;
          case 'next':
            icon = NextPageIcon;
            break;
          case '|<':
            icon = FirstPageIcon;
            break;
          case '>|':
            icon = LastPageIcon;
            break;
          default:
            icon = null;
        }
        return {
          onClick: (event: any) => {
            handlePaginationClick(event, buttonPage(item));
          },
          icon: icon,
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (item !== 'start-ellipsis' && item !== 'end-ellipsis' &&
              (item === 'next' || item === '>|' ? page >= paginationCount : page <= 1)),
        };
      }
    });
  
  
    return (
        <div className='pagination-container'>
        <ul className={isSticky ? 'sticky' : ''} style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex' }}>
            {items.map(({ page, type, selected, icon, ...item }, index) => {
            let component: React.ReactNode = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                component = (
                <div>
                    ...
                </div>
                );
            } else if (type === 'page') {
                component = (
                <button
                    type="button"
                    style={{
                    fontWeight: selected ? 'bold' : undefined,
                    }}
                    {...item}
                >
                    {page}
                </button>
                );
            } else {
                component = (
                <button type="button" {...item}>
                    {icon && <img src={icon} alt='icon'></img>}
                </button>
                );
            }

            return <li key={index} style={{alignContent: "center"}}>{component}</li>;
            })}
        </ul>
        </div>
    );
  }

export default Button