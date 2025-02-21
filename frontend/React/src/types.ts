export interface Book {
    _id: string,
    name: string,
    auteur: string,
    ISBN: number
}

export interface FormField{
	type: "text" | "number",
	name: string,
	placeholder: string
}
