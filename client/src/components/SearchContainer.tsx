import { clearFilters, handleChange } from "src/features/AllApis/AllApisSlice";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const dispatch = useAppDispatch();

  const { isLoading, search, status, sort, statusOptions, sortOptions } =
    useAppSelector((store) => store.allApis);

  const { monitoring, monitoringOptions } = useAppSelector(
    (store) => store.api
  );

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search for url */}
          <FormRow
            type="text"
            labelText="API URL search"
            name="url"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="status"
            value={status}
            handleChange={handleSearch}
            list={["All", ...statusOptions]}
          />
          {/* search by monitoring */}
          <FormRowSelect
            labelText="monitoring"
            name="monitoring"
            value={monitoring}
            handleChange={handleSearch}
            list={["All", ...monitoringOptions]}
          />
          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            type="reset"
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;