"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { runSearch } from "../utils/runSearch";
import { runAdvancedSearch } from "../utils/runAdvancedSearch";
import { SearchTabs } from "../components/SearchTabs/SearchTabs";
import { ViewToggle } from "../components/ViewToggle/ViewToggle";
import { DirectoryGrid } from "../components/DirectoryGrid/DirectoryGrid";
import { DirectoryList } from "../components/DirectoryList/DirectoryList";
import { TAdvancedFilters, TSearchMode, TViewMode } from "../types/Search";
import { useUserContext } from "../hooks/useUserContext";
import { useGetUsersQuery } from "../features/user/usersApiSlice";
import styles from "./page.module.scss";

// every field is clean by default
const defaultFilters: TAdvancedFilters = {
  name: "",
  email: "",
  phone: "",
  skype: "",
  building: "any",
  room: "",
  department: "any",
};

const IndexPage = () => {
  // new next hooks for navigation
  const navigate = useRouter();
  const searchParams = useSearchParams();

  const [searchMode, setSearchMode] = useState<TSearchMode>("basic"); // default search mode is basic
  const [viewMode, setViewMode] = useState<TViewMode>("grid"); // default view mode is grid

  // search state instead of using useEffect
  const initialSearch = searchParams.get("searchTerm") ?? ""; // get search term from url if it doesnt exist use empty string;
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch.toLowerCase());

  const [advancedDraft, setAdvancedDraft] =
    useState<TAdvancedFilters>(defaultFilters);
  const [advancedApplied, setAdvancedApplied] =
    useState<TAdvancedFilters>(defaultFilters);

  // Use RTK Query to fetch every user
  const { data: users = [], isLoading: loadingUsers } = useGetUsersQuery();
  const { loading } = useUserContext();

  // run advanced search
  const filteredUsers = useMemo(() => {
    // users are memoized since the list might become large later
    if (searchMode === "advanced") {
      return runAdvancedSearch(users, advancedApplied);
    }
    return runSearch(users, searchQuery);
  }, [users, searchMode, searchQuery, advancedApplied]);

  // display found employee count
  const employeesCount = filteredUsers.length;

  // hold values for advanced search until user pressed search
  const handleAdvancedChange = (
    field: keyof TAdvancedFilters,
    value: string
  ) => {
    setAdvancedDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleBasicSubmit = () => {
    // save the search term to url
    const term = searchInput.trim().toLowerCase();
    const params = new URLSearchParams(searchParams.toString());

    setSearchQuery(term);
    setSearchMode("basic");

    // if term is true set it in url else delete it
    if (term) {
      params.set("searchTerm", term);
    } else {
      params.delete("searchTerm");
    }

    navigate.replace(`?${params.toString()}`);
  };

  const handleAdvancedSubmit = () => {
    // switch to advaneced mode on click
    setAdvancedApplied(advancedDraft);
    setSearchMode("advanced"); // toggle advanced
  };

  // navigation using useNavigate instead of util
  const handleUserClick = (id: number) => {
    navigate.replace(`/users/${id}`);
  };

  return (
    <>
      <div className={styles["mobile-search-bar"]}>
        <div className={styles["mobile-search-bar__field"]}>
          <img
            className={styles["mobile-search-bar__icon"]}
            src="/assets/search.svg"
            alt="Search"
            width={16}
            height={16}
          />
          <span className={styles["mobile-search-bar__placeholder"]}>
            Open search panel
          </span>
        </div>
      </div>

      <main className={`${styles["directory"]} page--fade-in`}>
        <div className={styles["directory__content"]}>
          <SearchTabs
            searchMode={searchMode}
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            onBasicSubmit={handleBasicSubmit}
            advancedDraft={advancedDraft}
            onAdvancedChange={handleAdvancedChange}
            onAdvancedSubmit={handleAdvancedSubmit}
            setSearchMode={setSearchMode}
          />
          <div className={styles["directory__results"]}>
            <ViewToggle
              employeesCount={employeesCount}
              onChange={setViewMode}
            />
            {loadingUsers || loading ? (
              <div className={styles["directory__empty-state"]}>
                <h1>Loading...</h1>
              </div>
            ) : // if length is 0 that means no results
            filteredUsers.length === 0 ? (
              <div className={styles["directory__empty-state"]}>
                <h1>Nothing found</h1>
                <p>
                  No result match your search. Consider trying a different
                  search request.
                </p>
              </div>
            ) : (
              <>
                <DirectoryGrid
                  users={filteredUsers}
                  viewMode={viewMode}
                  onUserClick={handleUserClick}
                />
              </>
            )}
            {filteredUsers.length > 0 && (
              <DirectoryList
                users={filteredUsers}
                viewMode={viewMode}
                onUserClick={handleUserClick}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexPage;
