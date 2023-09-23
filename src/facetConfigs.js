import {sortByKey} from "./util";

const facetCategories = {
    works: [
        "popular",
        "author",
        "source",
        "funder",
        "institution",

        "open access",
        "search",
        "citation",
        "other",
    ],
    authors: [
        "popular",
        "institution",
        "geo",
        "ids",
        "other",
    ],
    sources: [
        "popular",
        "open access",
        "other",
    ],
    publishers: [
        "popular",
        "other",
    ],
    institutions: [
        "popular",
        "geo",
        "other",
    ],
    concepts: [
        "popular",
        "other"
    ],
}

const facetCategoriesIcons = {
    popular: "mdi-star-outline",
    author: "mdi-account-outline",
    institution: "mdi-town-hall",
    geo: "mdi-map-marker-outline",
    funder: "mdi-cash-multiple",
    "source": "mdi-book-multiple-outline",
    repository: "mdi-package-variant",
    search: "mdi-magnify",
    "open access": "mdi-lock-open-outline",
    apc: "mdi-cash",
    ids: "mdi-tag-outline",
    citation: "mdi-format-quote-close",
    other: "mdi-dots-horizontal",
}


const facetConfigs = function (entityType) {
    const ret = [


        // works:  WASPFIC. test

        {
            key: "ids.openalex",
            entityType: "works",
            entityId: "works",
            pidPrefix: "openalex",
            displayName: "Work",
            isEntity: true,
            isSingleWork: true,
            isId: true,
            showInSidebar: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-file-document-outline",
            regex: /^(?:https:\/\/openalex\.org\/)?([wW]\d+)$/,
        },
        {
            key: "doi",
            entityType: "works",
            entityId: "works",
            displayName: "DOI (work)",
            isEntity: true,
            isSingleWork: true,
            isId: true,
            pidPrefix: "doi",
            showInSidebar: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-file-document-outline",
            regex: /(10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)/,
        },
        {
            key: "concepts.id",
            entityType: "works",
            displayName: "concept",
            pidPrefix: "openalex",
            isEntity: true,
            showInSidebar: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            type: "select",
            categories: ["other",],
            isCore: true,
            icon: "mdi-lightbulb-outline",
            regex: /^(?:https:\/\/openalex\.org\/)?([cC]\d+)$/,
        },
        {
            key: "grants.funder",
            entityType: "works",
            displayName: "funder",
            pidPrefix: "openalex",
            isEntity: true,
            showInSidebar: true,
            entityId: "funders",
            type: "select",
            categories: ["funder"],
            isCore: true,
            icon: "mdi-cash-multiple",
            regex: /^(?:https:\/\/openalex\.org\/)?([fF]\d+)$/,
        },
        {
            key: "grants.award_id",
            entityType: "works",
            displayName: "grant ID",
            showInSidebar: true,
            type: "select",
            categories: ["funder"],
            isCore: true,
            icon: "mdi-cash-multiple",
        },

        {
            key: "authorships.institutions.id",
            entityType: "works",
            displayName: "institution",
            pidPrefix: "openalex",
            isEntity: true,
            showInSidebar: true,
            entityId: "institutions",
            autocompleteEndpoint: "autocomplete/institutions",
            type: "select",
            categories: ["institution", "popular"],
            isCore: true,
            icon: "mdi-town-hall",
            regex: /^(?:https:\/\/openalex\.org\/)?([iI]\d+)$/,
        },

        {
            key: "authorships.institutions.ror",
            entityType: "works",
            entityId: "institutions",
            displayName: "ROR ID",
            pidPrefix: "ror",
            isEntity: true,
            isId: true,
            showInSidebar: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-town-hall",
            regex: /https?:\/\/ror\.org\/(0[a-zA-Z0-9]+)/,
        },

        {
            key: "authorships.author.id",
            entityType: "works",
            displayName: "author",
            pidPrefix: "openalex",
            isEntity: true,
            showInSidebar: true,
            entityId: "authors",
            autocompleteEndpoint: "autocomplete/authors",
            type: "select",
            categories: ["author", "popular"],
            isCore: true,
            icon: "mdi-account-outline",
            regex: /^(?:https:\/\/openalex\.org\/)?([aA]\d+)$/,
        },


        {
            key: "authorships.author.orcid",
            entityType: "works",
            entityId: "authors",
            displayName: "ORCID (author)",
            pidPrefix: "orcid",
            isEntity: true,
            isId: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-account-outline",
            regex: /https?:\/\/orcid\.org\/(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/,
        },


        // works: search

        {
            key: "default.search",
            entityType: "works",
            displayName: "fulltext search",
            type: "search",
            categories: ["popular", "search"],
            isCore: true,
            icon: "mdi-magnify",
        },
        {
            key: "title.search",
            isDefault: true,
            entityType: "works",
            displayName: "title search",
            type: "search",
            categories: ["search"],
            isCore: true,
            icon: "mdi-magnify",
        },
        {
            key: "abstract.search",
            entityType: "works",
            displayName: "abstract search",
            type: "search",
            categories: ["search"],
            isCore: true,
            icon: "mdi-magnify",
        },

        {
            key: "has_abstract",
            entityType: "works",
            displayName: "has indexed abstract",
            booleanValues: ["Abstract NOT indexed", "Abstract indexed"],
            type: "boolean",
            categories: ["search"],
            icon: "mdi-file-document-outline",
        },
        {
            key: "has_ngrams",
            entityType: "works",
            displayName: "has indexed fulltext",
            booleanValues: ["fulltext NOT indexed", "fulltext indexed"],
            type: "boolean",
            categories: ["search"],
            icon: "mdi-file-document-outline",
        },


        // works: authors

        {
            key: "authors_count",
            entityType: "works",
            displayName: "number of authors",
            type: "range",
            sortByValue: true,
            placeholders: ["min", "max"],
            categories: ["author"],
            icon: "mdi-account-outline",
        },
        {
            key: "corresponding_author_ids",
            entityType: "works",
            displayName: "corresponding author",
            type: "select",
            categories: ["author"],
            icon: "mdi-account-outline",
        },


        // works: open access
        {
            key: "open_access.is_oa",
            entityType: "works",
            displayName: "Open Access",
            type: "boolean",
            booleanValues: ["NOT Open Access", "Open Access"],
            categories: ["popular", "open access"],
            isCore: true,
            icon: "mdi-lock-open-outline",
        },
        {
            key: "best_oa_location.license",
            entityType: "works",
            displayName: "license",
            type: "select",
            categories: ["open access"],
            icon: "mdi-lock-open-outline",
            displayNullAs: "All rights reserved",
        },
        // {
        //     key: "open_access.oa_status",
        //     entityType: "works",
        //     displayName: "OA Color",
        //     type: "select",
        //     categories: ["open access"],
        //     icon: "mdi-lock-open-outline",
        // },
        {
            key: "best_oa_location.version",
            entityType: "works",
            displayName: "Open Access version",
            type: "select",
            categories: ["open access"],
            icon: "mdi-lock-open-outline",
        },
        {
            key: "best_oa_location.is_accepted",
            entityType: "works",
            displayName: "has an open Accepted version",
            type: "boolean",
            booleanValues: ["NOT Open Access", "Open Access"],
            categories: ["open access"],
            isCore: true,
            icon: "mdi-lock-open-outline",
        },
        {
            key: "best_oa_location.is_published",
            entityType: "works",
            displayName: "has an open Published version",
            type: "boolean",
            booleanValues: ["NOT Open Access", "Open Access"],
            categories: ["open access"],
            isCore: true,
            icon: "mdi-lock-open-outline",
        },


        // works: APC
        {
            key: "apc_list.value_usd",
            entityType: "works",
            displayName: "APC list price",
            type: "range",
            sortByValue: true,
            placeholders: ["min", "max"],
            categories: ["apc"],
            isCore: true,
            icon: "mdi-cash"
        },
        {
            key: "apc_paid.value_usd",
            entityType: "works",
            displayName: "APC paid",
            type: "range",
            sortByValue: true,
            placeholders: ["min", "max"],
            categories: ["apc"],
            isCore: true,
            icon: "mdi-cash"
        },
        {
            key: "apc_paid.provenance",
            entityType: "works",
            displayName: "APC paid: provenance",
            type: "select",
            categories: ["apc"],
            isCore: true,
            icon: "mdi-cash"
        },


        // works: institutions:
        {
            key: "institutions.country_code",
            entityType: "works",
            displayName: "country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            type: "select",
            isCountry: true,
            categories: ["geo", "institution"],
            isCore: true,
            icon: "mdi-map-marker-outline",
        },
        {
            key: "countries_distinct_count",
            entityType: "works",
            displayName: "number of countries in author list",
            type: "range",
            sortByValue: true,
            examples: ["1", "2-", "2-10"],
            categories: ["geo"],
            icon: "mdi-map-marker-outline"
        },
        {
            key: "institutions.continent",
            entityType: "works",
            displayName: "continent",
            type: "select",
            categories: ["geo", "institution"],
            isCore: true,
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "institutions.is_global_south",
            entityType: "works",
            displayName: "from the Global South",
            type: "boolean",
            categories: ["geo", "institution"],
            booleanValues: ["Global North", "Global South"],
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "authorships.institutions.type",
            entityType: "works",
            displayName: "institution type",
            autocompleteEndpoint: "autocomplete/institutions/country",
            type: "select",
            categories: ["institution"],
            icon: "mdi-town-hall",
        },
        {
            key: "corresponding_institution_ids",
            entityType: "works",
            displayName: "corresponding institution",
            type: "select",
            categories: ["institution"],
            icon: "mdi-town-hall",
        },


        // works: primary source

        {
            key: "primary_location.source.id",
            entityType: "works",
            displayName: "source",
            pidPrefix: "openalex",
            isEntity: true,
            showInSidebar: true,
            entityId: "sources",
            autocompleteEndpoint: "autocomplete/sources",
            type: "select",
            categories: ["source"],
            isCore: true,
            icon: "mdi-book-open-outline",
            regex: /^(?:https:\/\/openalex\.org\/)?([sS]\d+)$/,
        },

        {
            key: "primary_location.source.issn",
            entityType: "works",
            entityId: "sources",
            displayName: "ISSN (Source)",
            isEntity: true,
            isId: true,
            pidPrefix: "issn",
            showInSidebar: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-book-open-outline",
            regex: /^(\b\d{4}-\d{3}[\dX]\b)$/,
        },
        {
            key: "primary_location.source.type",
            entityType: "works",
            displayName: "source type",
            type: "select",
            categories: ["source"],
            icon: "mdi-book-open-outline",
        },
        {
            key: "primary_location.source.is_in_doaj",
            entityType: "works",
            displayName: "indexed by DOAJ",
            type: "boolean",
            booleanValues: ["Not in DOAJ", "In DOAJ"],
            categories: ["source"],
            icon: "mdi-book-open-outline",
        },
        {
            key: "primary_location.source.is_oa",
            entityType: "works",
            displayName: "source is Open Access",
            type: "boolean",
            booleanValues: ["Not Open Access", "Open Access"],
            categories: ["source"],
            icon: "mdi-book-open-outline",
        },

        {
            key: "primary_location.source.publisher_lineage",
            entityType: "works",
            entityId: "publishers",
            displayName: "publisher",
            pidPrefix: "openalex",
            isEntity: true,
            showInSidebar: true,
            // entityId: "publishers",
            autocompleteEndpoint: "autocomplete/publishers",
            type: "select",
            categories: ["source"],
            isCore: true,
            icon: "mdi-domain",
            regex: /^(?:https:\/\/openalex\.org\/)?([pP]\d+)$/,
        },


        // works: repository

        {
            key: "repository",
            entityType: "works",
            displayName: "repository",
            isEntity: true,
            showInSidebar: true,
            entityId: "sources",
            type: "select",
            categories: ["repository"],
            isCore: true,
            icon: "mdi-book-open-outline",
        },
        {
            key: "open_access.any_repository_has_fulltext",
            entityType: "works",
            displayName: "has repository availability",
            type: "boolean",
            booleanValues: ["Not in any repository", "In a repository"],
            categories: ["repository"],
            icon: "mdi-tag-outline",
        },


        // works: intrinsic

        {
            key: "type",
            entityType: "works",
            displayName: "work type",
            type: "select",
            categories: ["popular", "other"],
            icon: "mdi-file-document-outline",
        },
        {
            key: "publication_year",
            entityType: "works",
            displayName: "publication year",
            type: "range",
            sortByValue: true,
            examples: ["1999", "1999-", "1999-2020"],
            categories: ["popular", "other"],
            isCore: true,
            icon: "mdi-calendar-text"
        },
        {
            key: "has_doi",
            entityType: "works",
            displayName: "indexed by Crossref",
            type: "boolean",
            booleanValues: ["Has a DOI", "No DOI"],
            categories: ["ids"],
            icon: "mdi-tag-outline",
        },
        {
            key: "has_orcid",
            entityType: "works",
            displayName: "indexed by ORCID",
            type: "boolean",
            booleanValues: ["No ORCID", "At least one ORCID",],
            categories: ["ids"],
            icon: "mdi-tag-outline",
        },
        {
            key: "has_pmid",
            entityType: "works",
            displayName: "indexed by PubMed",
            type: "boolean",
            categories: ["ids"],
            icon: "mdi-tag-outline",
            booleanValues: ["No PubMed ID", "Has PubMed ID"],
        },
        {
            key: "has_pmcid",
            entityType: "works",
            displayName: "indexed by PubMed Central",
            type: "boolean",
            categories: ["ids"],
            icon: "mdi-tag-outline",
            booleanValues: ["No PMC ID", "Has PMC ID"],
        },
        {
            key: "is_retracted",
            entityType: "works",
            displayName: "is retracted",
            type: "boolean",
            booleanValues: ["Isn't retracted", "Is retracted"],
            categories: ["other"],
            icon: "mdi-file-document-outline"
        },
        {
            key: "is_paratext",
            entityType: "works",
            displayName: "is paratext",
            type: "boolean",
            booleanValues: ["Isn't paratext", "Is paratext"],
            categories: ["other"],
            icon: "mdi-file-document-outline"
        },
        {
            key: "language",
            entityType: "works",
            displayName: "language",
            type: "select",
            displayNullAs: "Unknown",
            categories: ["other"],
            icon: "mdi-file-document-outline"
        },
        {
            key: "sustainable_development_goals.id",
            entityType: "works",
            displayName: "Sustainable Development Goals",
            type: "select",
            displayNullAs: "Unknown",
            categories: ["other", "popular"],
            icon: "mdi-lightbulb-outline"
        },


        {
            key: "cited_by_count",
            entityType: "works",
            displayName: "number of incoming citations",
            type: "range",
            sortByValue: true,
            placeholders: ["min", "max"],
            categories: ["citation"],
            isCore: true,
            icon: "mdi-file-document-outline",
        },
        {
            key: "cited_by",
            entityType: "works",
            displayName: "is cited by",
            showNameInChip: true,
            isEntity: true,
            showInSidebar: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            type: "entity",
            categories: ["citation"],
            icon: "mdi-format-quote-close",
        },
        {
            key: "cites",
            entityType: "works",
            displayName: "cites",
            isEntity: true,
            showInSidebar: true,
            showNameInChip: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            type: "entity",
            categories: ["citation"],
            icon: "mdi-format-quote-close",
        },
        {
            key: "related_to",
            entityType: "works",
            displayName: "is related to",
            isEntity: true,
            showInSidebar: true,
            showNameInChip: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            type: "entity",
            categories: ["other"],
            isHidden: true,
            icon: "mdi-book-open-outline",
        },


        // works: other

        {
            key: "locations_count",
            entityType: "works",
            displayName: "number of online locations",
            type: "range",
            sortByValue: true,
            placeholders: ["min", "max"],
            categories: ["other"],
            icon: "mdi-account-outline",
        },













        // authors
        {
            key: "ids.openalex",
            entityType: "authors",
            entityId: "authors",
            pidPrefix: "openalex",
            displayName: "author",
            isEntity: true,
            isId: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-account-outline",
            regex: /^(?:https:\/\/openalex\.org\/)?([wW]\d+)$/,
        },
        {
            key: "display_name.search",
            entityType: "authors",
            isDefault: true,
            displayName: "name search",
            type: "search",
            categories: ["search"],
            icon: "mdi-magnify",
        },
        {
            key: "last_known_institution.id",
            entityType: "authors",
            displayName: "institution",
            isEntity: true,
            entityId: "institutions",
            autocompleteEndpoint: "autocomplete/institutions",
            type: "select",
            categories: ["institution"],
            icon: "mdi-town-hall",
        },
        {
            key: "last_known_institution.country_code",
            entityType: "authors",
            displayName: "institution country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            type: "select",
            isCountry: true,
            categories: ["geo"],
            icon: "mdi-town-hall",
        },
        {
            key: "last_known_institution.type",
            entityType: "authors",
            displayName: "institution type",
            autocompleteEndpoint: "autocomplete/institutions/type",
            type: "select",
            categories: ["institution"],
            icon: "mdi-town-hall",
        },
        {
            key: "has_orcid",
            entityType: "authors",
            displayName: "indexed by ORCID",
            type: "boolean",
            booleanValues: ["No ORCID", "Has ORCID"],
            categories: ["ids"],
            icon: "mdi-tag-outline",
        },
        {
            key: "x_concepts.id",
            entityType: "authors",
            displayName: "concepts",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            type: "select",
            categories: ["other"],
            icon: "mdi-lightbulb-outline",
        },














        // sources
        {
            key: "ids.openalex",
            entityType: "sources",
            entityId: "sources",
            pidPrefix: "openalex",
            displayName: "source",
            isEntity: true,
            isId: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-book-open-outline",
            regex: /^(?:https:\/\/openalex\.org\/)?([wW]\d+)$/,
        },
        {
            key: "display_name.search",
            entityType: "sources",
            isDefault: true,
            displayName: "title search",
            type: "search",
            categories: ["search"],
            icon: "mdi-magnify",
        },
        {
            key: "publisher",
            entityType: "sources",
            displayName: "publisher",
            autocompleteEndpoint: "autocomplete/sources/publisher",
            type: "select",
            categories: ["popular"],
            icon: "mdi-book-open-outline",
        },
        {
            key: "type",
            entityType: "sources",
            displayName: "source type",
            type: "select",
            categories: ["popular"],
            icon: "mdi-book-open-outline",
        },
        {
            key: "is_oa",
            entityType: "sources",
            displayName: "Open Access",
            type: "select",
            categories: ["open access"],
            icon: "mdi-lock-open-outline",
        },
        {
            key: "is_in_doaj",
            entityType: "sources",
            displayName: "is in DOAJ",
            type: "select",
            categories: ["open access"],
            icon: "mdi-lock-open-outline",
        },
        {
            key: "x_concepts.id",
            entityType: "sources",
            displayName: "concepts",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            type: "select",
            categories: ["other"],
            icon: "mdi-lightbulb-outline",
        },











        // publishers
        {
            key: "ids.openalex",
            entityType: "publishers",
            entityId: "publishers",
            pidPrefix: "openalex",
            displayName: "publisher",
            isEntity: true,
            isId: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-domain",
            regex: /^(?:https:\/\/openalex\.org\/)?([wW]\d+)$/,
        },
        {
            key: "display_name.search",
            entityType: "publishers",
            isDefault: true,
            displayName: "name search",
            type: "search",
            categories: ["search"],
            icon: "mdi-magnify",
        },













        // funders
        {
            key: "ids.openalex",
            entityType: "funders",
            entityId: "funders",
            pidPrefix: "openalex",
            displayName: "funder",
            isEntity: true,
            isId: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-cash-multiple",
            regex: /^(?:https:\/\/openalex\.org\/)?([wW]\d+)$/,
        },
        {
            key: "display_name.search",
            entityType: "funders",
            isDefault: true,
            displayName: "name search",
            type: "search",
            categories: ["search"],
            icon: "mdi-magnify",
        },















        // institutions
        {
            key: "ids.openalex",
            entityType: "institutions",
            entityId: "institutions",
            pidPrefix: "openalex",
            displayName: "institution",
            isEntity: true,
            isId: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-town-hall",
            regex: /^(?:https:\/\/openalex\.org\/)?([wW]\d+)$/,
        },
        {
            key: "display_name.search",
            entityType: "institutions",
            isDefault: true,
            displayName: "name search",
            type: "search",
            categories: ["search"],
            icon: "mdi-magnify",
        },
        {
            key: "country_code",
            entityType: "institutions",
            displayName: "country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            type: "select",
            isCountry: true,
            categories: ["geo"],
            icon: "mdi-map-marker-outline"
        },
        {
            key: "type",
            entityType: "institutions",
            displayName: "Institution type",
            autocompleteEndpoint: "autocomplete/institutions/type",
            type: "select",
            categories: ["popular"],
            icon: "mdi-town-hall"
        },
        {
            key: "x_concepts.id",
            entityType: "institutions",
            displayName: "concepts",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            type: "select",
            categories: ["other"],
            icon: "mdi-lightbulb-outline",
        },














        // concepts
        {
            key: "ids.openalex",
            entityType: "concepts",
            entityId: "concepts",
            pidPrefix: "openalex",
            displayName: "concept",
            isEntity: true,
            isId: true,
            noOptions: true,
            type: "entity",
            categories: ["other"],
            icon: "mdi-lightbulb-outline",
            regex: /^(?:https:\/\/openalex\.org\/)?([wW]\d+)$/,
        },
        {
            key: "display_name.search",
            entityType: "concepts",
            isDefault: true,
            displayName: "name search",
            type: "search",
            categories: ["search"],
            icon: "mdi-magnify",
        },
        {
            key: "level",
            entityType: "concepts",
            displayName: "level",
            maxPotentialFiltersToShow: 10,
            type: "select",
            categories: ["popular"],
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
        .filter(config => {
            return !entityType || config.entityType === entityType
        })
}

const getFacetConfigFromPid = function (pid) {
    const trimmedPid = pid.trim()
    const x = facetConfigs().find(f => {

    })
    return x


}


const getFacetConfig = function (entityType, key) {
    const myFacetConfig = facetConfigs().find(f => f.key === key && f.entityType === entityType)
    if (!myFacetConfig) {
        const msg = `openAlex error: getFacetConfig(): no facet found for '${entityType}' filter "${key}"`
        console.log(msg)
        throw new Error(msg)

    }
    return {
        ...myFacetConfig,
        docstring: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    }
}


const makeFacet = function (key, isNegated, values) {
    return {
        key,
        isNegated,
        values,
        config: facetConfigs()[key]

    }
}

const filtersList = function (entityType, resultsFilters, searchString) {
    const ret = facetConfigs(entityType)
        .filter(c => {
            return c.entityType === entityType
        })
        .filter(c => {
            return c.displayName.toLowerCase().match(searchString?.toLowerCase())
        })
        .filter(c => {
            return !c.noOptions
        })

    const sorted = sortByKey(ret, "displayName")
    return sorted
}


const facetsByCategory = function (
    entityType,
    searchString = "",
    includeOnlyTypes = [],
    excludeFiltersByKey = [],
) {
    const filtered = facetConfigs(entityType)
        .filter(c => {
            return !searchString || c.displayName.toLowerCase().match(searchString?.toLowerCase())
        })
        .filter(c => {
            return !includeOnlyTypes.length || includeOnlyTypes.includes(c.type)
        })
        .filter(c => {
            return !excludeFiltersByKey.length || !excludeFiltersByKey.includes(c.key)
        })


    return facetCategories[entityType].map(categoryName => {
        const myFacets = filtered.filter(f => {
            return f.categories.includes(categoryName)
        })

        return {
            displayName: categoryName,
            icon: facetCategoriesIcons[categoryName],
            filterConfigs: myFacets,
        }
    })
        .filter(categoryObj => {
            return categoryObj.filterConfigs.length > 0
        })


}


export {
    makeFacet,
    facetConfigs,
    getFacetConfig,
    facetCategories,
    facetsByCategory,
    filtersList,
}






