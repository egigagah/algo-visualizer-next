import React, { useState } from "react";

export interface DropDownProps {
    title: string;
}

export default function DropDown({ title }: DropDownProps): JSX.Element {
    const [select, setSelected] = useState("quick");
    const options = [
        { value: "bubble", name: "Bubble Sort" },
        { value: "insertion", name: "insertion Sort" },
        { value: "quick", name: "quick Sort" },
    ];
    return (
        <div>
            <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                {title}
                <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <div
                id="dropdownDivider"
                className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
                <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                >
                    {options.map((item, idx) => (
                        <li key={idx} value={item.value}>
                            <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
