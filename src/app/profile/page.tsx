import EditProfileInfo from '@/components/profile/EditProfileInfo';
import UpdateImage from '@/components/profile/UpdateImage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';




const ProfilePage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-10 lg:px-8 dark:bg-gray-950">

            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors duration-300 sm:p-6 dark:border-gray-800 dark:bg-surface/95 md:p-10">

                <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:gap-8">

                    {/* Profile Photo */}
                    <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-6 dark:border-gray-800 md:border-b-0 md:border-r md:pr-8">

                        <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200 sm:h-40 sm:w-40 dark:border-gray-700">
                            <Image
                                src={user?.image ?? '/placeholder-avatar.png'}
                                alt="Profile Photo"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <UpdateImage />

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
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-surface/95 dark:text-white dark:placeholder:text-gray-500"
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
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-surface/95 dark:text-white dark:placeholder:text-gray-500"
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