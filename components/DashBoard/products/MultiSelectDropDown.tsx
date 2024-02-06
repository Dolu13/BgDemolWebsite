'use client'

import {useEffect, useState} from 'react';

export interface DropDownOption {
    id: number;
    label: string;
}

interface MultiSelectDropdownProps {
    options: DropDownOption[];
    onChange: (selectedOptions: number[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (id: number) => {
        setSelectedOptions(prevSelectedOptions => {
            if (prevSelectedOptions.includes(id)) {
                return prevSelectedOptions.filter(option => option !== id);
            } else {
                return [...prevSelectedOptions, id];
            }
        });
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Appeler la fonction de rappel onChange avec les options sélectionnées à chaque changement
    useEffect(() => {
        onChange(selectedOptions);
    }, [selectedOptions, onChange]);

    return (
        <div className="relative">
            <input type="checkbox" className="hidden peer" checked={isOpen} onChange={toggleDropdown} />


                <div className="flex flex-col">
                    {options.map(option => (
                        <label key={option.id} className="flex items-center">
                            <input
                                type="checkbox"
                                defaultValue=""
                                checked={selectedOptions.includes(option.id)}
                                onChange={() => toggleOption(option.id)}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
        </div>
    );
};

export default MultiSelectDropdown;
