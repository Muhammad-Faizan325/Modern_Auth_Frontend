import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Flag, AlignLeft } from "lucide-react";

const CreateTodo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-6 relative overflow-hidden">
      {/* Background Glows for Depth */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"></div>

      <Card className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl text-white">
        <CardHeader className="space-y-1 pb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <PlusCircle className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center tracking-tight">
            Create New Task
          </CardTitle>
          <p className="text-center text-gray-400 text-sm">
            Add a new idea or task to your Second Brain
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-indigo-200">
                <PlusCircle className="w-4 h-4" /> Title
              </Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What needs to be done?"
                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-gray-500 h-12"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-indigo-200">
                <AlignLeft className="w-4 h-4" /> Description
              </Label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add more details..."
                rows="3"
                className="w-full rounded-md border border-white/10 bg-white/5 p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-white placeholder:text-gray-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-indigo-200">
                  <Flag className="w-4 h-4" /> Priority
                </Label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full h-11 rounded-md border border-white/10 bg-[#1e1b4b] p-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition cursor-pointer"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-indigo-200">
                  <Calendar className="w-4 h-4" /> Due Date
                </Label>
                <Input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500 text-white h-11 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] mt-4"
            >
              Create Todo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTodo;
