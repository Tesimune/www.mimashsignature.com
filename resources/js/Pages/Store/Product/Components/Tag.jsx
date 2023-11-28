import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";

function Tag({ tag, setTag }) {
    const [newTag, setNewTag] = useState("");

      const removeTag = (itemToRemove) => {
          // Use filter to create a new array excluding the item to be removed
          const newArray = tag.filter((_, index) => index !== itemToRemove);

          // Set the state with the new array
          setTag("tag", newArray);
      };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
            {tag.length > 0 && (
                <>
                    {tag.map((tg, index) => (
                        <div
                            onClick={() => removeTag(index)}
                            key={index}
                            className="cursor-pointer border-2 p-2 rounded-xl"
                        >
                            <span className="h-9 rounded-xl">{tg.tag}</span>
                        </div>
                    ))}
                </>
            )}

            <div className="flex items-center gap-3 p-3">
                <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="input bg-slate-200 text-slate-800 border-none outline-none placeholder:text-slate-400"
                    placeholder="fashion"
                />
                {newTag && (
                    <span
                        onClick={() => setTag("tag", [...tag, { tag: newTag }])}
                        className="bg-slate-200 h-full p-3 text-slate-800 cursor-pointer rounded-xl"
                    >
                        <MdAddCircle className="h-6 w-6" />
                    </span>
                )}
            </div>
        </div>
    );
}

export default Tag;