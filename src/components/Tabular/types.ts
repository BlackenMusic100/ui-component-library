type TableFileds = {
    [key: string]: {
        name: string,
        component: string,
        customValue?: any,
        min?: number,
        max?: number,
        width?: string,
        options?: any,
        defaultValue?: string | number | readonly string[] | undefined,
        valueDisplay?: (...args: any[]) => any,
        customFunction?: (...args: any[]) => any,
        validation?: (...args: any[]) => any,
        inputBox?: (...args: any[]) => any,
        disabled?: (...args: any[]) => any,
        editRowOptions?: (...args: any[]) => any,
        selectedValue?: (...args: any[]) => any,
    }
}

export type TabularProps = {
    tableData: any; 
    tableFields: TableFileds; 
    onDataUpdate: (...args: any[]) => any; 
    readOnly: boolean;
}