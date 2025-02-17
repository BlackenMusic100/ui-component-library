import { Meta, StoryObj } from '@storybook/react'
import Reference from '../components/Reference';
import { ReferenceProps } from '../components/Reference/types';

const meta: Meta<ReferenceProps> = {
  title: 'Reference',
  component: Reference,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    boolean: {
        name: "boolean",
        type: {
            name: "string", required: false
        },
        description: "Description of argument",
        table: {
            type: {
                summary: 'Summary',
                detail: 'Detail'
            },
            category: 'Category'
        },
        control: {
            type: 'boolean'
        }
    },
    string: {
        control: {
            type: "multi-select"
        }
    },
    symbol: {
        control: {
            type: "select"
        }
    },
    color: {
        control: {
            type: "color"
        }
    },
    function: {
      description: "Button's onclick function",
      table: {
        type: {
          summary: "(() => void)"
        }
      }
    }
  },
  args: {
    number: 123
  }
};
  
export default meta;

type Story = StoryObj<ReferenceProps>


export const Primary: Story = {
  args: {
    boolean: false,
    string: "This is a string",
    symbol: "\u20AC",
  },
  render: ({ ...args }) => {
    return <Reference {...args}></Reference>;
  },
};

export const Secondary: Story = {
  args: {
    boolean: true,
    string: "This is not a string",
    symbol: "\u20AD",
  },
  render: ({ ...args }) => {
    return <Reference {...args}></Reference>;
  },
};