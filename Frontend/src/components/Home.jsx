import React, { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const initialState = {
    Doors: "",
    Accidents: "",
    Car_Age: "",
    Loc_city: 0,
    Loc_rural: 0,
    Loc_suburb: 0,
    New_One: 0,
    Best_Car: 0,
};

const Home = () => {
    const [formData, setFormData] = useState(initialState);
    const [result, setResult] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.Doors || !["2", "4"].includes(String(formData.Doors))) {
            newErrors.Doors = "Doors must be 2 or 4.";
        }
        if (formData.Accidents === "" || Number(formData.Accidents) < 0) {
            newErrors.Accidents = "Accidents must be a non-negative number.";
        }
        if (formData.Car_Age === "" || Number(formData.Car_Age) < 0) {
            newErrors.Car_Age = "Car age must be a non-negative number.";
        }
        if (formData.Loc_city + formData.Loc_rural + formData.Loc_suburb === 0) {
            newErrors.Location = "Please select a location.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLocationChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            Loc_city: value === "city" ? 1 : 0,
            Loc_rural: value === "rural" ? 1 : 0,
            Loc_suburb: value === "suburb" ? 1 : 0,
        }));
    };

    const handleCheckboxChange = (name, checked) => {
        setFormData((prev) => ({
            ...prev,
            [name]: checked ? 1 : 0,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null);
        if (!validate()) return;

        const payload = {
            ...formData,
            Doors: Number(formData.Doors),
            Accidents: Number(formData.Accidents),
            Car_Age: Number(formData.Car_Age),
        };

        try {
            setLoading(true);
            const res = await axios.post("http://127.0.0.1:8000/predict", payload, {
                headers: { "Content-Type": "application/json" },
            });
            setResult(res.data);
            setErrors({});
        } catch (err) {
            setErrors({ api: err.response?.data?.detail || "An unexpected server error occurred." });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData(initialState);
        setErrors({});
        setResult(null);
    };

    return (
        <div id="home" className="flex flex-col items-center justify-center min-h-dvh w-full bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 mt-16">
            <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
                    Car Price Predictor
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-md sm:text-lg text-gray-600 dark:text-gray-400">
                    Fill in the details to get an instant price estimate for your car.
                </p>
            </div>

            <Card className="w-full max-w-2xl shadow-lg rounded-2xl border-0">
                <form onSubmit={handleSubmit} noValidate>
                    <CardContent className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="Doors">Number of Doors</Label>
                            <Input id="Doors" type="number" name="Doors" value={formData.Doors} onChange={handleChange} placeholder="e.g., 4" />
                            {errors.Doors && <p className="text-xs text-red-500 pt-1">{errors.Doors}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Accidents">Number of Accidents</Label>
                            <Input id="Accidents" type="number" name="Accidents" value={formData.Accidents} onChange={handleChange} placeholder="e.g., 0" />
                            {errors.Accidents && <p className="text-xs text-red-500 pt-1">{errors.Accidents}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Car_Age">Car Age (in years)</Label>
                            <Input id="Car_Age" type="number" name="Car_Age" value={formData.Car_Age} onChange={handleChange} placeholder="e.g., 5" />
                            {errors.Car_Age && <p className="text-xs text-red-500 pt-1">{errors.Car_Age}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Select onValueChange={handleLocationChange} value={formData.Loc_city ? "city" : formData.Loc_rural ? "rural" : formData.Loc_suburb ? "suburb" : ""}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select car location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="city">City</SelectItem>
                                    <SelectItem value="rural">Rural</SelectItem>
                                    <SelectItem value="suburb">Suburb</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.Location && <p className="text-xs text-red-500 pt-1">{errors.Location}</p>}
                        </div>
                        <div className="md:col-span-2 flex items-center justify-around pt-4 border-t dark:border-gray-800">
                            <div className="flex items-center space-x-3">
                                <Checkbox id="New_One" checked={!!formData.New_One} onCheckedChange={(checked) => handleCheckboxChange("New_One", checked)} />
                                <Label htmlFor="New_One" className="cursor-pointer text-sm font-medium">New Model</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox id="Best_Car" checked={!!formData.Best_Car} onCheckedChange={(checked) => handleCheckboxChange("Best_Car", checked)} />
                                <Label htmlFor="Best_Car" className="cursor-pointer text-sm font-medium">Premium Trim</Label>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 p-6 sm:p-8 pt-0">
                        <div className="flex w-full flex-col sm:flex-row gap-3">
                            <Button type="submit" className="w-full  text-black hover:text-blue-900" disabled={loading}>
                                {loading ? "Calculating..." : "Predict Price"}
                            </Button>
                            
                        </div>
                        <Button type="button" variant="destructive" onClick={handleReset} disabled={loading} className="text-red-800 hover:text-amber-50 hover:bg-red-700 w-full sm:w-auto">
                                Reset
                            </Button>
                        {errors.api && <p className="text-sm text-red-600 text-center pt-2">{errors.api}</p>}
                    </CardFooter>
                </form>
            </Card>

            {result && (
                <Card className="w-full max-w-2xl mt-8 animate-in fade-in-50 duration-500 shadow-lg rounded-2xl border-0">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center tracking-tight">Prediction Results</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-6 p-6 pt-0">
                        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-center">
                            <Badge variant="secondary">Linear Regression</Badge>
                            <p className="text-3xl font-bold text-primary mt-2">
                                ${result.Linear_Regression_Prediction?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-center">
                            <Badge>Random Forest</Badge>
                            <p className="text-3xl font-bold text-primary mt-2">
                                ${result.Random_Forest_Prediction?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Home;