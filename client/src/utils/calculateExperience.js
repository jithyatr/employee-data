export function calculateExperiences(careerStartDate, joiningDate) {
    if (!careerStartDate || !joiningDate) {
        return {
            total: { years: 0, months: 0 },
            currentCompany: { years: 0, months: 0 }
        };
    }
    const start = new Date(careerStartDate); 
    const join = new Date(joiningDate);
    const now = new Date();

    function diffInMonths(from, to) {
        let months = (to.getFullYear() - from.getFullYear()) * 12;
        months += to.getMonth() - from.getMonth();
        if (to.getDate() < from.getDate()) months -= 1;
        return Math.max(0, months);
    }

    const currentMonths = diffInMonths(join, now);
    const totalMonths = diffInMonths(start, now);

    return {
        total: {
            years: Math.floor(totalMonths / 12),
            months: totalMonths % 12
        },
        currentCompany: {
            years: Math.floor(currentMonths / 12),
            months: currentMonths % 12
        }
    };
}
