import { TabularProps } from "./types"
import React, { useEffect, useState } from 'react'

const Tabular: React.FC<TabularProps> = ({ tableData, tableFields, onDataUpdate, readOnly }) => {
    const [data, setData] = useState(tableData);

    const [editIndex, setEditIndex] = useState(-1);
    const [editRow, setEditRow] = useState<Record<string, any>>({})
    const [newRow, setNewRow] = useState<Record<string, any>>({});

    const tableHeading = Object.keys(tableFields).filter(key => !readOnly || key !== 'Action');

    const handleInputChange = (event: { target: { name: any; value: any; type: any; }; }) => {
        let { name, value, type } = event.target;
        if (type === "number") {
            value = parseInt(value)
        }

        // custom data handling (only for displaying value when input is disabled)
        tableHeading.forEach(heading => {
            if (tableFields[heading]?.['name'] === name && tableFields[heading]?.['customValue']) { // If the changing field has 'customValue' props
                value = tableFields[heading]['customValue']("new", { ...newRow, [name]: value }, editRow)
            } else if (tableFields[heading]?.['customValue']) { // If the other fields has 'customValue' props
                newRow[tableFields[heading]['name']] = tableFields[heading]['customValue']("new", { ...newRow, [name]: value }, editRow)
            }
        })
        setNewRow({ ...newRow, [name]: value });
    };

    const handleEditChange = (event: { target: { name: any; value: any; type: any; }; }) => {
        let { name, value, type } = event.target;
        if (type === "number") {
            value = parseInt(value)
        }

        // custom data handling (only for displaying value when input is disabled)
        tableHeading.forEach(heading => {
            if (tableFields[heading]?.['name'] === name && tableFields[heading]?.['customValue']) { // If the changing field has 'customValue' props
                value = tableFields[heading]['customValue']("edit", newRow, { ...editRow, [name]: value })
            } else if (tableFields[heading]?.['customValue']) { // If the other fields has 'customValue' props
                editRow[tableFields[heading]['name']] = tableFields[heading]['customValue']("edit", newRow, { ...editRow, [name]: value })
            }
        })
        setEditRow({ ...editRow, [name]: value });
    };

    const handleIdValueInputChange = (event: { id: any; value: any; }) => {
        let { id, value } = event;
        setNewRow({ ...newRow, [id]: value})
    }

    const handleIdValueEditChange = (event: { id: any; value: any; }) => {
        let { id, value } = event;
        setEditRow({ ...editRow, [id]: value})
    }

    const handleLabelValueInputChange = (event: { label: any; value: any; }, name: any) => {
        let { value } = event;

        // custom data handling (only for displaying value when input is disabled)
        tableHeading.forEach(heading => {
            if (tableFields[heading]?.['name'] === name && tableFields[heading]?.['customValue']) { // If the changing field has 'customValue' props
                value = tableFields[heading]['customValue']("new", { ...newRow, [name]: value }, editRow)
            } else if (tableFields[heading]?.['customValue']) { // If the other fields has 'customValue' props
                newRow[tableFields[heading]['name']] = tableFields[heading]['customValue']("new", { ...newRow, [name]: value }, editRow)
            }
        })

        setNewRow({ ...newRow, [name]: value})
    }

    const handleLabelValueEditChange = (event: { label: any; value: any; }, name: any) => {
        let { value } = event;

        // custom data handling (only for displaying value when input is disabled)
        tableHeading.forEach(heading => {
            if (tableFields[heading]?.['name'] === name && tableFields[heading]?.['customValue']) { // If the changing field has 'customValue' props
                value = tableFields[heading]['customValue']("edit", newRow, { ...editRow, [name]: value })
            } else if (tableFields[heading]?.['customValue']) { // If the other fields has 'customValue' props
                editRow[tableFields[heading]['name']] = tableFields[heading]['customValue']("edit", newRow, { ...editRow, [name]: value })
            }
        })

        setEditRow({ ...editRow, [name]: value})
    }

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditRow(data[index])
    };

    const cancelEdit = () => {
        setEditIndex(-1);
    };

    const saveRow = () => {
        const newData = [...data];

        // row validation
        const isRowValid = tableFields['Action']?.validation?.(editRow) ?? true;

        // custom data handling
        tableHeading.forEach(heading => {
            if (tableFields[heading]?.['customFunction']) {
                editRow[tableFields[heading]['name']] = tableFields[heading]['customFunction']('edit', newRow, editRow)
            }
        })

        if (isRowValid) {
            newData[editIndex] = { ...editRow };
            setData(newData);
            cancelEdit();
        }
    };

    const addRow = () => {
        // row validation
        const isRowValid = tableFields['Action']?.validation?.(newRow) ?? true;

        // custom data handling
        tableHeading.forEach(heading => {
            if (tableFields[heading]?.['customFunction']) {
                newRow[tableFields[heading]['name']] = tableFields[heading]['customFunction']('new', newRow, editRow)
            }
        })

        if (isRowValid) {
            const newData = [...data, { ...newRow, id: data.length + 1 }];
            setData(newData);

            const newObject: any = {}
            for (let prop in newRow) {
                newObject[prop] = "";
            }
            setNewRow(newObject)
        }
    };

    const deleteRow = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    useEffect(() => {
        // Update the data in the parent component when it changes
        onDataUpdate(data);
    }, [data, onDataUpdate]);

    useEffect(() => {
        // Calculate and set the width of table header cells based on the content width of table data cells
        const thElements= document.querySelectorAll('th');
        const tdElements: any = document.querySelectorAll('td');
        thElements.forEach((th, index) => {
            const tdWidth = tdElements[index].offsetWidth;
            th.style.width = `${tdWidth}px`;
        });
    }, [data]);

    return (
        <table className='table table-bordered'>
            <thead>{/*header*/}
                <tr style={{textAlign:'center'}}>
                    {tableHeading.map((heading) => (
                        <th key={heading}>{heading}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row: { [x: string]: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: number) => ( // Display data and edit row
                    <tr key={`${index}-${row}`}>
                        {tableHeading.map(heading => (
                            <td style={{textAlign: "center", alignContent: 'center'}} key={tableFields[heading]?.['name']}>
                                {
                                    (() => {
                                        switch(tableFields[heading]?.['component']){
                                            case "text": // Text column
                                                return (editIndex === index ? (
                                                    <input
                                                        style={{width: tableFields[heading]['width']}}
                                                        className='bordered-input padding-input'
                                                        type={tableFields[heading]['component']}
                                                        name={tableFields[heading]['name']}
                                                        value={editRow[tableFields[heading]['name']]}
                                                        onChange={handleEditChange}
                                                    />
                                                ) : row[tableFields[heading]['name']])

                                            case "number": // Number column
                                                return (editIndex === index ? 
                                                    tableFields[heading]?.['inputBox'] ? tableFields[heading]?.['inputBox']("edit", newRow, editRow, handleIdValueInputChange, handleIdValueEditChange) :
                                                    (
                                                    <input 
                                                        style={{width: tableFields[heading]['width']}}
                                                        className='bordered-input padding-input'
                                                        type={tableFields[heading]['component']}
                                                        name={tableFields[heading]['name']}
                                                        value={editRow[tableFields[heading]['name']]}
                                                        min={tableFields[heading]['min']}
                                                        max={tableFields[heading]['max']}
                                                        disabled={tableFields[heading]['disabled'] ? tableFields[heading]['disabled'](newRow, editRow) : false}
                                                        onChange={handleEditChange}
                                                    />
                                                ) : tableFields[heading]['valueDisplay'] ? tableFields[heading]['valueDisplay'](row[tableFields[heading]['name']]) : row[tableFields[heading]['name']])
                                            
                                            case "dropdown": // Dropdown column
                                                return (editIndex === index ? 
                                                    tableFields[heading]['inputBox'] ? tableFields[heading]['inputBox']("edit", newRow, editRow, editIndex, handleLabelValueInputChange, handleLabelValueEditChange) :
                                                    (
                                                    <select name={tableFields[heading]['name']} value={editRow[tableFields[heading]['name']]} onChange={handleEditChange}
                                                            className='bordered-input padding-input'>
                                                        {tableFields[heading]['editRowOptions'] ? tableFields[heading]['editRowOptions'](editRow, editIndex).map((option: { value: any ; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                                            <option key={option.value} value={option.value}>{option.label}</option>
                                                        )) : 
                                                        tableFields[heading]['options'].map((option: { value: any; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                                            <option key={option.value} value={option.value}>{option.label}</option>
                                                        ))}
                                                    </select>
                                                ) : tableFields[heading]['valueDisplay'] ? tableFields[heading]['valueDisplay'](row[tableFields[heading]['name']]) : row[tableFields[heading]['name']])
                                            
                                            case "customInput": // needed when data & input needed to be customized
                                                return tableFields[heading]['valueDisplay'] ? tableFields[heading]['valueDisplay'](row[tableFields[heading]['name']]) : row[tableFields[heading]['name']]
                                            
                                            case "action": // Action column
                                                return (editIndex === index ? (
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <button style={{margin: "3px"}} className='btn btn-primary' onClick={saveRow}>Save</button>
                                                        <button style={{margin: "3px"}} className='btn btn-primary' onClick={cancelEdit}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <button style={{margin: "3px"}} className='btn btn-primary' onClick={() => handleEdit(index)}>Edit</button>
                                                        <button style={{margin: "3px"}} className='btn btn-primary' onClick={() => deleteRow(index)}>Delete</button>
                                                    </div>
                                                ))
                                            default:
                                                return null
                                        }
                                    })()
                                }
                            </td>
                        ))}
                    </tr>
                ))}
                {!readOnly && <tr>
                    {tableHeading.map(heading => ( // New Row
                        <td style={{textAlign: "center", alignContent: 'center'}} key={tableFields[heading]?.['name']+"_"+tableFields[heading]?.['component']}>
                            {(() => {
                                switch(tableFields[heading]?.['component']){
                                    case "text": // text input
                                        return (
                                            <input
                                                style={{width: tableFields[heading]['width']}}
                                                className='bordered-input padding-input'
                                                type={tableFields[heading]['component']}
                                                name={tableFields[heading]['name']}
                                                value={newRow[tableFields[heading]['name']] ? newRow[tableFields[heading]['name']] : ""}
                                                onChange={handleInputChange}
                                            />
                                        )
                                    case "number": // number input
                                        return tableFields[heading]['inputBox'] ? tableFields[heading]['inputBox']("new", newRow, editRow, handleIdValueInputChange, handleIdValueEditChange) :
                                        (
                                            <input 
                                                style={{width: tableFields[heading]['width']}}
                                                className='bordered-input padding-input'
                                                type={tableFields[heading]['component']}
                                                name={tableFields[heading]['name']}
                                                value={newRow[tableFields[heading]['name']] ? newRow[tableFields[heading]['name']] : 0 }
                                                min={tableFields[heading]['min']}
                                                max={tableFields[heading]['max']}
                                                disabled={tableFields[heading]['disabled'] ? tableFields[heading]['disabled'](newRow, editRow) : false}
                                                onChange={handleInputChange}
                                            />
                                        )
                                    case "dropdown": // dropdown input
                                        return tableFields[heading]['inputBox'] ? tableFields[heading]['inputBox']("new", newRow, editRow, editIndex, handleLabelValueInputChange, handleLabelValueEditChange) :
                                        (
                                            <select name={tableFields[heading]['name']} value={tableFields[heading]?.['selectedValue'] ? tableFields[heading]['selectedValue'](newRow, editRow) : newRow[tableFields[heading]['name']]} onChange={handleInputChange}
                                                    defaultValue={tableFields[heading]['defaultValue']} className='bordered-input padding-input'>
                                                {tableFields[heading]['options'] && typeof tableFields[heading]['options'] === 'function' ? 
                                                tableFields[heading]['options'](newRow, editRow).map((option: { value: any; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                )) : tableFields[heading]['options'].map((option: { value: any; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        )
                                    case "customInput": // needed when data & input needed to be customized
                                        return tableFields[heading]['valueDisplay'] ? tableFields[heading]['valueDisplay']() : ""
                                    case "action": // action
                                        return (
                                            <button className='btn btn-primary' onClick={addRow}>Add</button>
                                        )
                                    default:
                                        return null
                                }
                            })()}
                        </td>
                    ))}
                </tr>}
            </tbody>
        </table>
    );
}

export default Tabular