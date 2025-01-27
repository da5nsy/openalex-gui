// color ideas!
// https://www.heavy.ai/blog/12-color-palettes-for-telling-better-stories-with-your-data
// https://carbondesignsystem.com/data-visualization/color-palettes/

import countryCodeLookup from "country-code-lookup";

const entityConfigs = {
    works: {
        emoji: "📄",
        icon: "mdi-file-document-outline",
        name: "works",
        nameSingular: "work",
        displayName: "works",
        displayNameSingular: "work",
        descr: "Scholarly papers, books, datasets, etc.",
        eg: "On the Electrodynamics of Moving Bodies",
        placeholder: "Search scholarly papers, books, and more",
        filterName: "work",
        filterKey: "ids.openalex",
        hintVerb: "by",
        color: "blue",
        highlightFilters: [
            {key: "open_access.is_oa", value: true, displayName: "Open Access works"},
            {key: "institutions.is_global_south", value: true, displayName: "from the Global South"},
            {key: "type", value: "dataset", displayName: "datasets"},

        ]
    },
    authors: {
        emoji: "🧑",
        // icon: "mdi-account-school-outline",
        icon: "mdi-account-outline",
        name: "authors",
        nameSingular: "author",
        displayName: "authors",
        displayNameSingular: "author",
        descr: "Creators of scholarly works",
        eg: "Albert Einstein",
        placeholder: "Search scholarly authors",
        filterName: "author",
        filterKey: "authorships.author.id",
        hintVerb: "at",
        color: "green",
        highlightFilters: [
            {key: "has_orcid", value: true, displayName: "with ORCIDs"},
            {key: "last_known_institution.is_global_south", value: true, displayName: "from the Global South"},
        ]
    },
    sources: {
        emoji: "📚",
        // icon: "mdi-book-outline",
        icon: "mdi-book-open-outline",
        name: "sources",
        nameSingular: "source",
        displayName: "sources",
        displayNameSingular: "source",
        descr: "Journals, conferences, and repositories",
        eg: "The New England Journal of Medicine",
        placeholder: "Search academic journals & repositories",
        filterName: "primary_location.source",
        filterKey: "primary_location.source.id",
        hintVerb: "published by",
        color: "orange",
        highlightFilters: [
            {key: "is_oa", value: true, displayName: "that are Open Access"},
        ]
    },
    publishers: {
        emoji: "📚",
        // icon: "mdi-book-outline",
        icon: "mdi-domain",
        name: "publishers",
        nameSingular: "publisher",
        displayName: "publishers",
        displayNameSingular: "publisher",
        descr: "Company hosting journals",
        eg: "Elsevier",
        placeholder: "Search academic publishers",
        filterName: "primary_location.source.publisher_lineage",
        filterKey: "primary_location.source.publisher_lineage",
        color: "pink",
    },
    funders: {
        emoji: "💰",
        // icon: "mdi-book-outline",
        icon: "mdi-cash-multiple",
        name: "funders",
        nameSingular: "funder",
        displayName: "funders",
        displayNameSingular: "funder",
        descr: "Organization funding works via grants",
        eg: "US National Science Foundation",
        placeholder: "Search research funders",
        filterName: "grants.funder",
        filterKey: "grants.funder",
        color: "brown",
    },
    institutions: {
        emoji: "🏫",
        icon: "mdi-town-hall",
        name: "institutions",
        nameSingular: "institution",
        displayName: "institutions",
        displayNameSingular: "institution",
        descr: "Universities and research centers",
        eg: "Harvard University",
        placeholder: "Search academic institutions",
        filterName: "institutions",
        filterKey: "authorships.institutions.lineage",
        hintVerb: "in",
        color: "purple",
    },
    concepts: {
        emoji: "💡",
        icon: "mdi-lightbulb-outline",
        name: "concepts",
        nameSingular: "concept",
        displayName: "concepts",
        displayNameSingular: "concept",
        descr: "Topics and fields of study",
        eg: "History",
        placeholder: "Search topics",
        filterName: "concepts",
        filterKey: "concepts.id",
        color: "blue-grey",
    },
}

const getEntityConfig = function (name) {
    return Object.values(entityConfigs).find(c => {
        return c.nameSingular === name || c.displayName === name
    })
}

const getLocationString = function (entity) {
    if (!entity || !entity?.country_code) return
    const countryResult = countryCodeLookup.byIso(entity?.country_code)


    const locArr = [
        entity?.geo?.city,
        entity?.geo?.region,
        countryResult?.country,
    ].filter(x => x)
    return locArr.join(", ")
}

export {
    entityConfigs,
    getEntityConfig,
    getLocationString,
}