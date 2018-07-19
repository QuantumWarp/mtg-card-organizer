public class PropertySort<TDto> {
    public string Field { get; set; }
    public bool Ascending { get; set; }

    public PropertySort(string field, bool ascending = true) {
        Field = field;
        Ascending = ascending;
    }
}
