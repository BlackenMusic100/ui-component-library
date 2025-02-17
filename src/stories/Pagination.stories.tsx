import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Pagination from "../components/Pagination";
import { PaginationProps } from '../components/Pagination/types';

const meta: Meta<PaginationProps> = {
  title: 'UIComponents/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    page: {
        control: {
            type: "number",
            min: 1
        },
        table: {
            category: "Page"
        }
    },
    paginationCount: {
        control: {
            type: "number",
            min: 1
        },
        table: {
            category: "Page"
        }
    },
    boundaryCount: {
        control: {
            type: "number",
            min: 0
        },
        table: {
            category: "Feature"
        }
    },
    siblingCount: {
        control: {
            type: "number",
            min: 0
        },
        table: {
            category: "Feature"
        }
    },
    disabled: {
        control: {
            type: "boolean"
        },
        table: {
            category: "Feature"
        }
    },
    hideNextButton: {
        control: {
            type: "boolean"
        },
        table: {
            category: "Feature"
        }
    },
    hidePrevButton: {
        control: {
            type: "boolean"
        },
        table: {
            category: "Feature"
        }
    },
    showFirstButton: {
        control: {
            type: "boolean"
        },
        table: {
            category: "Feature"
        }
    },
    showLastButton: {
        control: {
            type: "boolean"
        },
        table: {
            category: "Feature"
        }
    },
    onPaginationClick: {
        table: {
            category: 'Events'
        }
    }
  },
  args: {
      onPaginationClick: fn(),
  },
};
  
export default meta;

type Story = StoryObj<PaginationProps>

export const Primary: Story = {
  args: {
    page: 1,
    paginationCount: 1,
    boundaryCount: 1,
    siblingCount: 1,
    disabled: false,
    hideNextButton: false,
    hidePrevButton: false,
    showFirstButton: true,
    showLastButton: true,
    onPaginationClick: () => console.log("You've clicked the button")
  },
  render: ({ ...args }) => {
    return <Pagination {...args}></Pagination>;
  },
};