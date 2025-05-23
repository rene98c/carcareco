'use client';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'; 


const tabs = [
  { name: 'My Account', href: '/home/profile', icon: UserIcon },
  { name: 'Invoice Options', href: '/home/settings', icon: BuildingOfficeIcon }
]

export default function SettingsTabs() {

  const currentPath = usePathname();
  const router = useRouter();
  return (

    <div className="pt-4  px-2  xl:px-5" >

      <div className="grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          defaultValue={tabs.find((tab) => currentPath.startsWith(tab.href) )?.href}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full text-sm font-medium appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          onChange={(e)=>{ 
            router.push(e.currentTarget.value)
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.href}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        {/* <div className="border-b border-gray-200"> */}
        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={clsx(
                currentPath.startsWith(tab.href) 
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
              )}
            >
              <tab.icon
                aria-hidden="true"
                className={clsx(
                  currentPath.startsWith(tab.href) ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-2 -ml-0.5 size-5',
                )}
              />
              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
        {/* </div> */}
      </div>
    </div>
  )
}