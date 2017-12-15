using System.Collections.Generic;

public class PagedData<T> {
    public IEnumerable<T> Data { get; set; }
    public int TotalCount { get; set; }

    public PagedData(IEnumerable<T> data, int totalCount) {
        Data = data;
        TotalCount = totalCount;
    }
}