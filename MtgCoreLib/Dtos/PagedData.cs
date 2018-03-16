using System.Collections.Generic;

public class PagedData<T> {
    public List<T> Data { get; set; }
    public int TotalCount { get; set; }

    public PagedData(List<T> data, int totalCount) {
        Data = data;
        TotalCount = totalCount;
    }
}