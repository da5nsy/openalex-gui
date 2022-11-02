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

const makeFacetQueryFilters = function (facetFilters) {

}

const facetCategories = {
    works: [
        "popular",
        "institution",
        "location",
        "host",
        "access",
        "ids",
        "citation",
        "other",
    ],
    authors: [
        "popular",
        "institution",
        "location",
        "ids",
        "other",
    ],
    venues: [
        "popular",
        "access",
        "other",
    ],
    institutions: [
        "popular",
        "location",
        "other",
    ],
    concepts: [
        "popular",
        "other"
    ],
}

const facetConfigs = function () {
    const ret = [
        // shared
        {
            key: "x_concepts.id",
            entityTypes: ["authors", "institutions", "venues"],
            displayName: "Concepts",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            valuesToShow: "mostCommon",
            category: "other",
            icon: "mdi-lightbulb-outline",
        },


        // works:  wavic
        {
            key: "concepts.id",
            entityTypes: ["works"],
            displayName: "Concept",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            valuesToShow: "mostCommon",
            category: "other",
            isCore: true,
            icon: "mdi-lightbulb-outline",
        },
        {
            key: "host_venue.id",
            entityTypes: ["works"],
            displayName: "Host",
            isEntity: true,
            entityId: "venues",
            autocompleteEndpoint: "autocomplete/venues",
            valuesToShow: "mostCommon",
            category: "host",
            isCore: true,
            icon: "mdi-book-open-outline",
        },
        {
            key: "authorships.institutions.id",
            entityTypes: ["works"],
            displayName: "Institution",
            isEntity: true,
            entityId: "institutions",
            autocompleteEndpoint: "autocomplete/institutions",
            valuesToShow: "mostCommon",
            category: "institution",
            isCore: true,
            icon: "mdi-town-hall",
        },
        {
            key: "authorships.author.id",
            entityTypes: ["works"],
            displayName: "Author",
            isEntity: true,
            entityId: "authors",
            autocompleteEndpoint: "autocomplete/authors",
            valuesToShow: "mostCommon",
            category: "popular",
            isCore: true,
        icon: "mdi-account-outline",
        },


        // works: host venue
        {
            key: "host_venue.publisher",
            entityTypes: ["works"],
            displayName: "Publisher",
            autocompleteEndpoint: "autocomplete/venues/publisher",
            valuesToShow: "mostCommon",
            category: "host",
        icon: "mdi-book-open-outline",
        },
        {
            key: "host_venue.type",
            entityTypes: ["works"],
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/venues/publisher",
            valuesToShow: "mostCommon",
            category: "host",
        icon: "mdi-book-open-outline",
        },


        // works: open access
        {
            key: "open_access.is_oa",
            entityTypes: ["works"],
            displayName: "Access",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["Toll-access", "Open Access"],
            category: "access",
            isCore: true,
            icon: "mdi-lock-open-outline",
        },
        {
            key: "host_venue.license",
            entityTypes: ["works"],
            displayName: "License",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },
        {
            key: "open_access.oa_status",
            entityTypes: ["works"],
            displayName: "Color",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },
        // {
        //     key: "has_abstract",
        //     entityTypes: ["works"],
        //     displayName: "Has abstract",
        //     valuesToShow: "mostCommon",
        // },


        // works: institutions:
        {
            key: "authorships.institutions.country_code",
            entityTypes: ["works"],
            displayName: "Country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            isCountry: true,
            category: "location",
            isCore: true,
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "authorships.institutions.continent",
            entityTypes: ["works"],
            displayName: "Continent",
            valuesToShow: "mostCommon",
            category: "location",
            isCore: true,
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "authorships.institutions.is_global_south",
            entityTypes: ["works"],
            displayName: "Global South",
            category: "location",
            isBoolean: true,
            booleanValues: ["Not Global South", "Global South"],
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "authorships.institutions.type",
            entityTypes: ["works"],
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            category: "institution",
            icon: "mdi-town-hall",
        },


        {
            key: "type",
            entityTypes: ["works"],
            displayName: "Type",
            valuesToShow: "mostCommon",
            category: "popular",
        icon: "mdi-file-document-outline",
        },
        {
            key: "publication_year",
            entityTypes: ["works"],
            displayName: "Year published",
            valuesToShow: "range",
            sortByValue: true,
            isRange: true,
            category: "popular",
            isCore: true,
            sortToTop: true,
            icon: "mdi-calendar-text"
        },
        {
            key: "has_doi",
            entityTypes: ["works"],
            displayName: "DOI",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["Has no DOI", "Has DOI"],
            category: "ids",
            icon: "mdi-label-outline",
        },
        {
            key: "has_pmid",
            entityTypes: ["works"],
            displayName: "PMID",
            valuesToShow: "boolean",
            isBoolean: true,
            category: "ids",
            icon: "mdi-label-outline",
            booleanValues: ["Has no PMID", "Has PMID"],
        },
        {
            key: "has_pmcid",
            entityTypes: ["works"],
            displayName: "PMC ID",
            valuesToShow: "boolean",
            isBoolean: true,
            category: "ids",
            icon: "mdi-label-outline",
            booleanValues: ["No PMC ID", "Has PMC ID"],
        },
        // {
        //     key: "has_ngrams",
        //     entityTypes: ["works"],
        //     displayName: "N-grams",
        //     valuesToShow: "boolean",
        //     isBoolean: true,
        //     booleanValues: ["Has no n-grams", "Has n-grams"],
        // },
        // {
        //     key: "is_paratext",
        //     entityTypes: ["works"],
        //     displayName: "Paratext",
        //     valuesToShow: "boolean",
        //     isBoolean: true,
        //     booleanValues: ["Isn't paratext", "Is paratext"],
        // },
        {
            key: "is_retracted",
            entityTypes: ["works"],
            displayName: "Retracted",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["Isn't retracted", "Is retracted"],
            category: "other",
            icon: "mdi-file-document-outline"
        },

        // works: links to other works
        // {
        //     key: "cited_by_count",
        //     entityTypes: ["works"],
        //     displayName: "Citation count",
        //     valuesToShow: "mostCommon",
        //     sortByValue: true,
        //     isRange: true,
        //     category: "citation",
        //     isCore: true,
        // },
        {
            key: "cited_by",
            entityTypes: ["works"],
            displayName: "Cited by",
            isEntity: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            valuesToShow: "select",
            category: "citation",
            icon: "mdi-format-quote-close",
        },
        {
            key: "cites",
            entityTypes: ["works"],
            displayName: "Cites",
            isEntity: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            valuesToShow: "select",
            category: "access",
            icon: "mdi-format-quote-close",
        },
        {
            key: "related_to",
            entityTypes: ["works"],
            displayName: "Related to",
            isEntity: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            valuesToShow: "select",
            category: "other",
            isHidden: true,
            icon: "mdi-file-document-multiple-outline",
        },








        // authors
        {
            key: "last_known_institution.id",
            entityTypes: ["authors"],
            displayName: "Institution",
            isEntity: true,
            entityId: "institutions",
            autocompleteEndpoint: "autocomplete/institutions",
            valuesToShow: "mostCommon",
            category: "institution",
            icon: "mdi-town-hall",
        },
        {
            key: "last_known_institution.country_code",
            entityTypes: ["authors"],
            displayName: "Country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            isCountry: true,
            category: "location",
            icon: "mdi-map-marker-outline",
        },
        {
            key: "last_known_institution.type",
            entityTypes: ["authors"],
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/institutions/type",
            valuesToShow: "mostCommon",
            category: "institution",
            icon: "mdi-town-hall",
        },
        {
            key: "has_orcid",
            entityTypes: ["authors"],
            displayName: "ORCID",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["No ORCID", "Has ORCID"],
            category: "ids",
            icon: "mdi-label-outline",
        },









        // venues
        {
            key: "publisher",
            entityTypes: ["venues"],
            displayName: "Publisher",
            autocompleteEndpoint: "autocomplete/venues/publisher",
            valuesToShow: "mostCommon",
            category: "popular",
            icon: "mdi-book-open-outline",
        },
        {
            key: "is_oa",
            entityTypes: ["venues"],
            displayName: "Open Access",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },
        {
            key: "is_in_doaj",
            entityTypes: ["venues"],
            displayName: "In DOAJ",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },







        // institutions
        {
            key: "country_code",
            entityTypes: ["institutions"],
            displayName: "Country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            isCountry: true,
            category: "location",
            icon: "mdi-map-marker-outline"
        },
        {
            key: "type",
            entityTypes: ["institutions"],
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/institutions/type",
            valuesToShow: "mostCommon",
            category: "popular",
            icon: "mdi-town-hall"
        },







        // concepts
        {
            key: "level",
            entityTypes: ["concepts"],
            displayName: "Level",
            maxPotentialFiltersToShow: 10,
            valuesToShow: "mostCommon",
            category: "popular",
            icon: "mdi-lightbulb-outline"
        },
    ]
    return ret
        // .filter(f => onlyReturnTheseFacets.includes(f.key))
        .map(config => {
            return {
                ...config,
                // values: [],
            }
        })
}

const getFacetConfig = function (key, attr) {
    const myFacetConfig = facetConfigs().find(f => f.key === key)
    if (!myFacetConfig) throw(`openAlex error: getFacetConfig: no such key as "${key}"`)

    if (!attr) return myFacetConfig
    if (myFacetConfig) return myFacetConfig[attr]
}

const makeFacet = function (key, isNegated, values) {
    return {
        key,
        isNegated,
        values,
        config: facetConfigs()[key]

    }

}


export {
    makeFacet,
    facetConfigs,
    getFacetConfig,
    facetCategories,
}