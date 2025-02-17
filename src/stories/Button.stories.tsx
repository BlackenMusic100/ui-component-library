import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from "../components/Button/index";
import { ButtonProps } from '../components/Button/types';

const meta: Meta<ButtonProps> = {
  title: 'UIComponents/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    isLoading: {
      control: {
        type: 'boolean'
      }
    },
    text: {
      control: {
        type: 'text'
      }
    },
    variant: {
      options: ['primary', 'secondary', 'error'],
      control: {
        type: 'select'
      }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select'
      }
    },
  },
  args: {
    button: {
      onClick: fn(),
    }
  },
};
  
export default meta;

type Story = StoryObj<ButtonProps>

export const Primary: Story = {
  args: {
    text: "Yes",
    button: {
      onClick: () => console.log("You've clicked the button")
    }
  },
  render: ({ ...args }) => {
    return <Button {...args}>{args.text}</Button>;
  },
};

export const Loading: Story = {
  args: {
    text: "Yes",
    isLoading: true,
    button: {
      onClick: () => console.log("You've clicked the button"),
      style: {
        width: "50px",
        height: "50px"
      }
    }
  },
  render: ({ ...args }) => {
    return <Button {...args}>{args.text}</Button>;
  },
};