import EditProfileInfo from '@/components/profile/EditProfileInfo';
import { auth } from '@/lib/auth';
import { Camera } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';




const ProfilePage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-gray-950">

            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 md:p-10">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">

                    {/* Profile Photo */}
                    <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-6 dark:border-gray-800 md:border-b-0 md:border-r md:pr-8">

                        <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                            <Image
                                src={user?.image ?? '/placeholder-avatar.png'}
                                alt="Profile Photo"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg border border-purple-300 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
                        >
                            <Camera size={16} />
                            Change Photo
                        </button>

                    </div>

                    {/* Profile Information */}
                    <div className="w-full">

                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                My Profile
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage your account information
                            </p>
                        </div>

                        <div className="space-y-4">

                            {/* Name */}
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

                        </div>

                        {/* Update Button */}
                        <EditProfileInfo />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;