const BlogPostSkeleton = () => {
    return (
        <div class="flex flex-col items-center justify-center p-4">
            <div class="w-3/4 mb-4 h-8 bg-gray-300 rounded animate-pulse"></div>
            <div class="w-full md:w-3/4 h-64 bg-gray-300 rounded-md animate-pulse"></div>
            <div class="w-full md:w-3/4 mt-4">
                <div class="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div class="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
        </div>

    );
};

export default BlogPostSkeleton;
