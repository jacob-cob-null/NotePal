export function resetBg(target) {
    const removeBackgroundClasses = (element) => {
        const classesToRemove = [];
        element.classList.forEach(className => {
            if (className.startsWith('bg-') && className.includes('-')) {
                classesToRemove.push(className);
            }
        });
        element.classList.remove(...classesToRemove);
    };

    removeBackgroundClasses(target);
    target.classList.add('bg-gray-50');

}