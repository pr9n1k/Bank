import { useMemo } from "react";
import { Employee } from "../models/Employee";



const useEmployee = (employee: Employee[] , query: string): Employee[] => {
    const queryEmployee = useMemo(() => {
        return employee.filter(employee => employee.surname.includes(query));
    },[query,employee])
    return queryEmployee;
}

export default useEmployee;
