import { templates } from "../assets";

const TemplateGrid = ({ onTemplateClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div className="w-full" key={template.id}>
          <div
            className="cursor-pointer bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition hover:-translate-y-1"
            title={template.label}
            onClick={() => onTemplateClick(template.id)}
          >
            <img
              src={template.image}
              alt={template.label}
              className="w-full h-40 object-cover"
              loading="lazy"
            />

            <div className="p-3 text-center font-medium text-slate-700 text-sm">
              {template.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
