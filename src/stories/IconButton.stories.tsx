import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import SearchIcon from '../assets/icons/search-icon-white.svg'
import IconButton from "../components/IconButton/index";
import { IconButtonProps } from '../components/IconButton/types';

const meta: Meta<IconButtonProps> = {
  title: 'UIComponents/IconButton',
  component: IconButton,
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
  },
  args: {
    button: {
      onClick: fn(),
    }
  },
};

export default meta

type Story = StoryObj<IconButtonProps>

export const Primary: Story = {
    args: {
      icon: SearchIcon,
      button: {
        onClick: () => console.log("You've clicked the button")
      }
    },
    render: ({ ...args }) => {
      return <IconButton {...args}>{args.icon}</IconButton>;
    },
};

export const Loading: Story = {
  args: {
    icon: SearchIcon,
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
    return <IconButton {...args}>{args.icon}</IconButton>;
  },
};