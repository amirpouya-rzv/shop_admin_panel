import { Field } from "formik";
import { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa"; // استفاده از آیکن حذف از react-icons

const SearchableSelect = ({
  resultType,
  options,
  name,
  label,
  className,
  firstItem,
  initialItems,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [copyOptions, setCopyOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const bodyClickListener = useRef(null);

  useEffect(() => {
    setSelectedItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    setCopyOptions(options.filter((o) => o.value.includes(searchTerm)));
  }, [options, searchTerm]);

  useEffect(() => {
    bodyClickListener.current = () => setShowItems(false);
    document.body.addEventListener("click", bodyClickListener.current);

    return () => document.body.removeEventListener("click", bodyClickListener.current);
  }, []);

  const handleSelectItems = (selectedId, formik) => {
    if (selectedItems.findIndex((d) => d.id == selectedId) == -1 && selectedId > 0) {
      const newData = [...selectedItems, options.find((o) => o.id == selectedId)];
      setSelectedItems(newData);
      const selectedIds = newData.map((nd) => nd.id);
      const nameValue = resultType == "string" ? selectedIds.join("-") : selectedIds;
      formik.setFieldValue(name, nameValue);
    }
  };

  const handleRemovefromSelectedItems = (event, selectedId, formik) => {
    event.stopPropagation();
    setSelectedItems((oldData) => {
      const newData = oldData.filter((d) => d.id != selectedId);
      const selectedIds = newData.map((nd) => nd.id);
      const nameValue = resultType == "string" ? selectedIds.join("-") : selectedIds;
      formik.setFieldValue(name, nameValue);
      return newData;
    });
  };

  return (
    <Field>
      {({ form }) => (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-3">
            <div
              className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowItems(!showItems);
              }}
            >
              <div className="flex flex-wrap gap-2">
                {selectedItems.length > 0 ? (
                  selectedItems.map((selectedItem) => (
                    <span
                      className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm shadow-md"
                      key={selectedItem.id}
                    >
                      <FaTimes
                        className="text-red-500 cursor-pointer ml-2"
                        onClick={(e) => handleRemovefromSelectedItems(e, selectedItem.id, form)}
                      />
                      {selectedItem.value}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">{firstItem}</span>
                )}
              </div>
              <input
                type="text"
                className="hidden"
                placeholder="قسمتی از عنوان مورد نظر را وارد کنید"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!showItems}
              />
            </div>

            {showItems && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                <ul className="p-0 m-0">
                  {copyOptions.map((o) => (
                    <li
                      key={o.id}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
                      onClick={() => handleSelectItems(o.id, form)}
                    >
                      {o.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <span htmlFor={name + "-select"} className="absolute right-2 top-0 text-gray-700">
            {label}
          </span>
          {/* <ErrorMessage name={name} component="div" className="text-red-500 text-sm" /> */}
        </div>
      )}
    </Field>
  );
};

export default SearchableSelect;
