import React from "react";

function Statcard({ icon: Icon, title, count, color }) {
  return (
    <div>
      <div className={`p-6 rounded-lg shadow-md ${color} text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{count}</h3>
          </div>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default Statcard;
