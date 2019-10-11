import os



class Paths:
    os_directory_separator = "\\"
    segmented_path = os.getcwd().split(os_directory_separator)

    MACROBEAT_TOP_LEVEL = os_directory_separator.join(segmented_path[:-3])
    BACKEND = os_directory_separator.join(segmented_path[:-1])
    CACHED_FILES = os_directory_separator.join(segmented_path[:-1] + ["cached_files"])
    CACHED_FILES_YOUTUBE = os_directory_separator.join(CACHED_FILES.split(os_directory_separator) + ["youtube"])