import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";

interface DeleteAlertProps {
  action: () => void;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({ action }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="flex items-center justify-center text-[#E7000B] hover:bg-red-50 rounded-lg p-1.5 cursor-pointer  transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="sm:max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-[#101828]">
              Delete Item
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm text-[#667085]">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border border-border cursor-pointer">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={action}
              className="bg-[#E7000B]! hover:bg-[#c40009] text-white cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAlert;
