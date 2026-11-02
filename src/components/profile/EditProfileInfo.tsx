import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const session = await auth.api.getSession({
    headers: await headers()
});

const user = session?.user;

const EditProfileInfo = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger
                    render={
                        <Button
                            type="button"
                            className="mt-6 rounded-lg bg-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800"
                        >
                            Update Profile
                        </Button>
                    }
                />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit your profile</DialogTitle>
                        <DialogDescription>
                            <form>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        name='name'
                                        type="text"
                                        defaultValue={user?.name}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={user?.email}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                                    />
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditProfileInfo;