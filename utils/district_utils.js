const districtCache = {};

export async function getDistrictData(districtId) {
    if (districtCache[districtId]) {
        return districtCache[districtId];
    }

    const url = `/data/districts/${districtId}.json`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to load district JSON: ${districtId}`);
        }

        const data = await res.json();

        districtCache[districtId] = data;

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}
