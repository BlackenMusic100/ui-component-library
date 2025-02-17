import { Meta, StoryObj } from '@storybook/react'
import DateRangePicker from "../components/DateRangePicker/index";
import { DateRangePickerProps as DateRangePickerProps } from '../components/DateRangePicker/types';

const meta: Meta<DateRangePickerProps> = {
  title: 'UIComponents/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    startDate: {
        control: {
            type: 'text'
        }
    },
    startDateLabel: {
      control: {
        type: 'text'
      }
    },
    endDate: {
        control: {
            type: 'text'
        }
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

const today = new Date();
const yyyy = today.getFullYear();
let mm: any = today.getMonth() + 1;
let dd: any = today.getDate();

if (dd < 10) dd = '0' + dd.toString();
if (mm < 10) mm = '0' + mm.toString();

const formattedDate = dd + '/' + mm + '/' + yyyy;


export const Primary: Story = {
  args: {
    startDate: formattedDate,
    endDate: formattedDate,
    startDateLabel: "Start",
    endDateLabel: "End",
    numberOfMonths: 2,
  },
  render: ({ ...args }) => {
    return <div>
      <DateRangePicker {...args}></DateRangePicker>
      </div>
  },
};

export const DoublePagedCalendar: Story = {
  args: {
    startDate: formattedDate,
    endDate: formattedDate,
    startDateLabel: "Start",
    endDateLabel: "End",
  },
  render: ({ ...args }) => {
    return <div>
      <DateRangePicker {...args}></DateRangePicker>
      </div>
  },
};

