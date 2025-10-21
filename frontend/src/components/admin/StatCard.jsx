import React from 'react'

const StatCard = ({title,value,icon}) => {
    return (

        <div
            className="flex items-center justify-between bg-white dark:bg-gray-900 border border-purple-800/40 rounded-2xl p-4 shadow-md hover:shadow-lg"
        >
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {value.toLocaleString()}
                </h3>
            </div>
            <div className="text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                {icon}
            </div>
        </div>

    )
}

export default StatCard