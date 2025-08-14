import Employee from "../model/employee.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, designation, careerStartDate, joiningDate, projects, onBench } = req.body;
    const employee = new Employee({
      name,
      designation,
      careerStartDate,
      joiningDate,
      projects: projects.split(",").map(p => p.trim()),
      onBench
    });

    await employee.save();
    res.status(201).json({
      ...employee.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create employee", error });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, careerStartDate, joiningDate, projects, onBench } = req.body;
    const updated = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        designation,
        careerStartDate,
        joiningDate,
        projects: projects.split(',').map(p => p.trim()),
        onBench,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Employee not found' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee', error });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Employee not found' });

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee', error });
  }
};