import { Meta, StoryObj } from '@storybook/react'
import DateRangePicker from "../components/DateRangePicker/index";
import { DateRangePickerProps as DateRangePickerProps } from '../components/DateRangePicker/types';
import { fn } from '@storybook/test';

const meta: Meta<DateRangePickerProps> = {
  title: 'UIComponents/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    fromDate: {
        control: {
            type: 'date'
        }
    },
    onFromDateChange: {
      description: "Function triggered when fromDate changed with its value in params"
    },
    startDateLabel: {
      control: {
        type: 'text'
      }
    },
    toDate: {
        control: {
            type: 'date'
        }
    },
    onToDateChange: {
      description: "Function triggered when toDate changed with its value in params"
    },
    endDateLabel: {
      control: {
        type: 'text'
      }
    },
    minDate: {
      control: {
        type: 'date'
      }
    },
    maxDate: {
      control: {
        type: 'date'
      }
    },
    numberOfMonths: {
      control: {
        type: 'number'
      }
    }
  },
};
  
export default meta;

type Story = StoryObj<DateRangePickerProps>



export const Primary: Story = {
  args: {
    startDateLabel: "Start",
    endDateLabel: "End",
    numberOfMonths: 2,
    onFromDateChange: fn(),
    onToDateChange: fn(),
  },
  render: ({ ...args }) => {
    return <div>
      <DateRangePicker {...args}></DateRangePicker>
      </div>
  },
};

export const DoublePagedCalendar: Story = {
  args: {
    startDateLabel: "Start",
    endDateLabel: "End",
    onFromDateChange: fn(),
    onToDateChange: fn(),
  },
  render: ({ ...args }) => {
    return <div>
      <DateRangePicker {...args}></DateRangePicker>
      </div>
  },
};

