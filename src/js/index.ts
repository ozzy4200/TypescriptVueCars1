import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ICar {
    id: number
    model: string
    vendor: string
    price: number
}

let baseUri: string = "http://anbo-carsrest.azurewebsites.net/api/cars"

new Vue({
    el: "#app",
    data: {
        cars: [],
        errorMessage: ""
       formData: {
            model: "",
            vendor: "",
            price: 0
        },
        addMessage: "",
        deleteId: -1,
        deleteMessage: ""
    },
    methods: {
        getAllCars() {
            console.log("getAllCars")
            axios.get<ICar[]>(baseUri)
                .then((response: AxiosResponse<ICar[]>) => {
                    console.log(response.data)
                    this.cars = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                    this.addMessage = error.message
                })
        },
        addCar() {
            axios.post<ICar>(baseUri, this.formData)
                .then((response: AxiosResponse<ICar>) => {
                    console.log(response.data)
                    this.addMessage = "Car added"
                })
                .catch((error: AxiosError) => {
                    this.addMessage = "Car added"
                })
        },
        deleteCar(deleteId: number) {
            let uri: string = baseUri + "/" + deleteId
            axios.delete<void>(baseUri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = "Car deleted"
                    this.getAllCars()
                })
                .catch((error: AxiosError) => {
                    this.deleteMessage = error.message
                }
        }
    }
})
