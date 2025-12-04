import { useContext, useRef } from "react";
import { templates } from "../assets";
import { AppContext } from "../context/AppContext";

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate } = useContext(AppContext);

  return (
    <div className="container mx-auto min-h-screen flex flex-col p-4 space-y-6">
      {/* CTA BUTTONS */}
      <div className="flex flex-col items-center gap-4">
        {/* LIST OF TEMPLATE BUTTONS */}
        <div className="flex gap-2 flex-wrap justify-center overflow-x-auto py-1 px-2">
          {templates.map((template) => (
            <button
              key={template.id}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-shadow ${
                selectedTemplate === template.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-slate-700 border border-slate-200 hover:shadow-sm"
              }`}
            >
              {template.label}
            </button>
          ))}
        </div>

        {/* LIST OF ACTION BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:shadow transition">
            Save and Exit
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition">
            Delete Invoice
          </button>
          <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:shadow transition">
            Back to Dashboard
          </button>
          <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg hover:bg-blue-100 transition">
            Send Email
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Download PDF
          </button>
        </div>
      </div>

      {/* PREVIEW AREA */}
      <div className="flex grow overflow-auto justify-center items-start py-4">
        <div
          ref={previewRef}
          className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-inner p-6"
        >
          <div className="w-full min-h-[110vh] overflow-auto bg-slate-50 rounded-md flex items-center justify-center text-slate-400">
            Preview PDF
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
