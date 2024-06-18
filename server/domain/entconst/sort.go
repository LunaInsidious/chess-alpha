package entconst

type SortBy string

const (
	SortByNone SortBy = ""
	SortByName SortBy = "name" // user detail
)

func (sb SortBy) String() string {
	return string(sb)
}

type Order string

const (
	ASC  Order = "asc"
	DESC Order = "desc"
)

func (o Order) String() string {
	return string(o)
}

func ValidateOrder(order string) error {
	if order == string(ASC) || order == string(DESC) {
		return nil
	}
	return NewValidationError("invalid order")
}
