import { Check, Edit2, Plus, Trash2, Wrench, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import CommonButton from "../../components/shared/button/CommonButton";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
  type Service,
} from "../../store/services/servicesApi";

const iconOptions = [
  "Truck",
  "Package",
  "Box",
  "Home",
  "Building2",
  "ShieldCheck",
  "Clock",
  "Sparkles",
  "Layers",
  "Warehouse",
];

const ServicesManager = () => {
  const { data: rawServices = [], isLoading } = useGetServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const services = Array.isArray(rawServices) ? rawServices : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Truck");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setIcon("Truck");
    setSortOrder(services.length + 1);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingId(service.id || service._id || "");
    setTitle(service.title || "");
    setDescription(service.description || "");
    setIcon(service.icon || "Truck");
    setSortOrder(service.sortOrder ?? 0);
    setIsActive(service.isActive !== false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in both title and description.");
      return;
    }

    try {
      if (editingId) {
        await updateService({
          id: editingId,
          data: {
            title: title.trim(),
            description: description.trim(),
            icon,
            sortOrder: Number(sortOrder),
            isActive,
          },
        }).unwrap();
        toast.success("Service updated successfully!");
      } else {
        await createService({
          title: title.trim(),
          description: description.trim(),
          icon,
          sortOrder: Number(sortOrder),
          isActive,
        }).unwrap();
        toast.success("Service created successfully!");
      }
      closeModal();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save service.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await deleteService(id).unwrap();
      toast.success("Service deleted.");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete service.");
    }
  };

  if (isLoading) {
    return <div className="text-offYellow p-8">Loading services...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-barlow font-bold uppercase tracking-wide text-white">
            Services Management
          </h1>
          <p className="text-offYellow mt-1">
            Add, update, or remove services displayed to customers.
          </p>
        </div>
        <CommonButton onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2 inline" /> Add Service
        </CommonButton>
      </div>

      <div className="bg-[#0d1e33] rounded-xl border border-border overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-offYellow">
            <thead className="bg-[#071425] text-white uppercase font-barlow tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-4">Sort</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                const serviceId = service.id || service._id || "";
                return (
                  <tr
                    key={serviceId}
                    className="border-b border-border hover:bg-[#071425]/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-yellow">
                      {service.sortOrder ?? 0}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {service.title}
                    </td>
                    <td
                      className="px-6 py-4 max-w-xs truncate"
                      title={service.description}
                    >
                      {service.description}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#071425] border border-border text-xs text-yellow">
                        <Wrench className="w-3.5 h-3.5" />
                        {service.icon || "Default"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          service.isActive !== false
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {service.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(serviceId)}
                        className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {services.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-offYellow"
                  >
                    No services yet. Click &quot;Add Service&quot; above to
                    create one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="bg-[#0d1e33] border border-border rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-[#071425]">
              <h2 className="text-xl font-barlow font-bold uppercase tracking-wider text-white">
                {editingId ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={closeModal}
                className="text-offYellow hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Residential Moving"
                  className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what is included in this service..."
                  className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                    Icon Name
                  </label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-yellow focus:ring-yellow"
                />
                <label
                  htmlFor="isActiveToggle"
                  className="text-sm font-semibold text-white cursor-pointer select-none"
                >
                  Active (Visible on public website)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm rounded text-offYellow hover:bg-[#071425] transition-colors"
                >
                  Cancel
                </button>
                <CommonButton
                  type="submit"
                  size="md"
                  disabled={isCreating || isUpdating}
                >
                  <Check className="w-4 h-4 mr-1 inline" />
                  {editingId ? "Save Changes" : "Create Service"}
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
