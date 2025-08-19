import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BarsArrowDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils";
import { searchStore, sortStore, filterStore } from "../store";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useStore } from "@nanostores/react";

const sortOptions = [
  { name: "Best Rating", current: true },
  { name: "Worst Rating", current: false },
];

const filterOptions = [
  { name: "All", current: true, id: 0 },
  { name: "5 Stars", current: false, id: 5 },
  { name: "4 Stars", current: false, id: 4 },
  { name: "3 Stars", current: false, id: 3 },
  { name: "2 Stars", current: false, id: 2 },
  { name: "1 Star", current: false, id: 1 },
];

export default function Filters() {
  const filterIds = useStore(filterStore);
  return (
    <div className="flex w-full items-center ">
      <div className="w-full max-w-sm">
        <div className="">
          <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 outline-none dark:bg-white/5 dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 dark:focus-within:outline-indigo-500">
            <input
              id="search"
              name="search"
              type="text"
              value={searchStore.get()}
              onChange={(e) => searchStore.set(e.target.value)}
              placeholder="Search teachers..."
              className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="col-start-1 row-start-1 py-4 flex ">
        <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
          <Menu as="div" className="relative inline-block">
            <div className="flex">
              <MenuButton className="group inline-flex cursor-pointer outline-none justify-center items-center text-sm font-medium text-white hover:text-gray-100 hover:bg-white/10 p-2 rounded-sm">
                <span className="mb-1">Sort</span>
                <BarsArrowDownIcon
                  aria-hidden="true"
                  className="ml-1 size-4 shrink-0 text-white group-hover:text-gray-100"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    <span
                      onClick={() =>
                        sortStore.set(
                          option.name === "Best Rating" ? "best" : "worst"
                        )
                      }
                      className={classNames(
                        option.current
                          ? "font-medium text-gray-900"
                          : "text-gray-500",
                        "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                      )}
                    >
                      {option.name}
                    </span>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
        <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
          <Menu as="div" className="relative inline-block">
            <div className="flex">
              <MenuButton className="group inline-flex cursor-pointer outline-none justify-center items-center text-sm font-medium text-white hover:text-gray-100 hover:bg-white/10 p-2 rounded-sm">
                <span className="mb-1">Filter</span>
                <FunnelIcon
                  aria-hidden="true"
                  className="ml-1 size-4 shrink-0 text-white group-hover:text-gray-100"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                {filterOptions.map((option) => (
                  <MenuItem key={option.id}>
                    <span
                      onClick={() => {
                        if (filterIds.includes(option.id)) {
                          filterStore.set(
                            filterIds.filter((id) => id !== option.id)
                          );
                        } else if (option.id === 0) {
                          filterStore.set([0]);
                        } else {
                          filterStore.set(
                            filterIds.filter((id) => id !== 0).concat(option.id)
                          );
                        }
                      }}
                      className={classNames(
                        filterIds.includes(option.id)
                          ? "font-medium bg-amber-100"
                          : "",
                        "block px-4  text-gray-800 py-2 text-xs data-focus:bg-gray-100 data-focus:outline-hidden"
                      )}
                    >
                      {option.name}
                    </span>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
