const allEntityTypes = function (hideThese) {
    const types = ["works", "authors", "institutions", "venues", "concepts"]
    if (hideThese) {
        if (!Array.isArray(hideThese)) hideThese = [hideThese]
        return types.filter(e => {
            return hideThese.indexOf(e) > -1
        })
    } else {
        return types
    }
}
const facetConfigs = function () {
    const ret = [
        {
            key: "display_name.search",
            entityTypes: allEntityTypes(),
            displayName: "Name",
        },
        {
            key: "x-concepts.id",
            entityTypes: ["authors", "institutions", "venues"],
            displayName: "Concepts",
            isEntity: true,
        },
        {
            key: "concepts.id",
            entityTypes: ["works"],
            displayName: "Concepts",
            isEntity: true,
        },
        {
            key: "host_venue.id",
            entityTypes: ["works"],
            displayName: "Venues",
            isEntity: true,
        },
    ]
    return ret.map(config => {
        return {
            ...config,
            values: [],
        }
    })
}

const getFacetConfig = function(key, attr){
    const myFacetConfig = facetConfigs().find(f => f.key === key)
    if (myFacetConfig) return myFacetConfig[attr]
}


export {
    facetConfigs,
    getFacetConfig,
}