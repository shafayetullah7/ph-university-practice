import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(searchFields: string[]) {
    if (this?.query?.searchTerm) {
      this.queryModel = this?.queryModel.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: { $regex: this?.query.searchTerm },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }

  filter() {
    const exclude = ["searchTerm", "sort", "page", "limit", "sort"];
    const queryObj = { ...this?.query };
    exclude.forEach((el) => delete queryObj[el]);

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = this?.query.sort || "-createdAt";
    this.queryModel = this?.queryModel.sort(
      (sort as string)?.split(",").join(" ")
    );
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.queryModel = this?.queryModel.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",").join(" ") || "-__v";

    this.queryModel = this.queryModel.select(fields);
    return this;
  }
}

export default QueryBuilder;
