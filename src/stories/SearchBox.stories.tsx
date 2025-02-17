import { Meta, StoryObj } from '@storybook/react'
import SearchBox from '../components/SearchBox';
import { SearchBoxProps } from '../components/SearchBox/types';
import SearchIcon from '../assets/icons/search-icon-black.svg'

const meta: Meta<SearchBoxProps> = {
  title: 'UIComponents/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    input: {
        name: "Input properties",
        // type: {
        //     name: "object", required: false
        // },
        description: "Properties of the input field.",
        control: {
            type: "object"
        }
    },
    button: {
      name: "Button properties",
      description: "Properties of the search button.",
      control: {
        type: "object"
      }
    },
    dropdownSelection: {
      name: "Dropdown selection",
      description: "Array of selection that is going to be displayed as dropdown.",
      table: {
        type: {
          summary: "['One', 'Two', 'Three', 'Four', 'Five']"
        }
      },
      control: {
        type: 'object'
      }
    },
    hasButtonContent: {
      control: {
        type: "boolean"
      }
    },
    buttonIcon: {
      control: {
        type: "text"
      }
    },
    buttonText: {
      control: {
        type: "text"
      }
    },
    buttonPosition: {
      control: {
        type: 'select',
      },
      options: ['Right', 'Left', 'null']
    },
    isLoading: {
      control: {
        type: 'boolean'
      }
    }
  },
  args: {
    buttonPosition: "Right",
  }
};

export default meta;

type Story = StoryObj<SearchBoxProps>


export const Primary: Story = {
  args: {
    button: {
      onClick: () => {console.log('gaga')},
    },
    hasButtonContent: true,
    buttonIcon: SearchIcon,
    dropdownSelection: ["Eric", "Tan", "Peter", "Pan", "Welly"]
  },
  render: ({ ...args }) => {
    return <SearchBox {...args} />;
  },
};

export const Loading: Story = {
  args: {
    buttonPosition: "Right",
    button: {},
    hasButtonContent: true,
    dropdownSelection: ['One', 'Two', 'Three', 'Four', 'Five'],
    buttonIcon: SearchIcon,
    isLoading: true
  },

  render: (
    {
      ...args
    }
  ) => {
    return <SearchBox {...args} />;
  }
};

export const NoDropDown: Story = {
  args: {
    buttonPosition: "Right",
    button: {},
    hasButtonContent: true,
    buttonIcon: SearchIcon,
  },

  render: (
    {
      ...args
    }
  ) => {
    return <SearchBox {...args} />;
  }
};

export const LeftButton: Story = {
  args: {
    buttonPosition: "Left",
    button: {
      onClick: () => console.log('Clicked')
    },
    hasButtonContent: true,
    buttonIcon: SearchIcon,
  },

  render: (
    {
      ...args
    }
  ) => {
    return <SearchBox {...args} />;
  }
};