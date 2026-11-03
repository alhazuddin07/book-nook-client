'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { authClient } from "@/lib/auth-client";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";

const UpdateImage = () => {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleUpdateForm = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const newData = Object.fromEntries(formData.entries());

        const { error } = await authClient.updateUser({
            ...newData,
        });

        if (error) {
            console.log(error.message);
            return;
        };

        setOpen(false);

        router.refresh();

        toast.add({
            type: "success",
            description: "Image update successfully!"
        });

    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger
                    render={
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg border border-purple-300 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
                        >
                            <Camera size={16} />
                            Change Photo
                        </button>
                    }
                />

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit your profile</DialogTitle>

                        <DialogDescription>
                            Update your profile information below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateForm} className="space-y-4">

                        <div className="space-y-2">
                            <label
                                htmlFor="image"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                ImageUrl
                            </label>

                            <input
                                id="image"
                                name="image"
                                type="url"
                                accept="image/*"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateImage;