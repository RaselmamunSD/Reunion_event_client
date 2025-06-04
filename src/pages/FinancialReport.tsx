import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from '@/components/ui/use-toast';
import moment from 'moment';
import 'moment/locale/bn-bd'; // Import Bengali locale
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

moment.locale('bn-bd'); // Set locale globally or in useEffect if preferred

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

interface FinancialCategory {
  id: number;
  name: string;
  description?: string;
}

interface Income {
  id: number;
  category?: FinancialCategory;
  category_id: number;
  amount: string;
  date: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface Expense {
  id: number;
  category?: FinancialCategory;
  category_id: number;
  amount: string;
  date: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ApiResponse<T> {
  status: 'success' | 'error';
  error?: string;
  data?: T;
}

interface IncomeTotalResponse {
  total_income: string;
  status: 'success' | 'error';
  error?: string;
}

interface ExpenseTotalResponse {
  total_expenses: string;
  status: 'success' | 'error';
  error?: string;
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#6ee7b7', '#fdba74', '#fca5a5', '#a78bfa', '#67e8f9'];

const FinancialReport = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [incomeCategoriesData, setIncomeCategoriesData] = useState<CategoryData[]>([]);
  const [expenseCategoriesData, setExpenseCategoriesData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFinancialData = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      // Fetch total income and expense
      const [incomeTotalRes, expenseTotalRes, incomesRes, expensesRes] = await Promise.all([
        fetch(`${API_URL}/incomes/total/`),
        fetch(`${API_URL}/expenses/total/`),
        fetch(`${API_URL}/incomes/`),
        fetch(`${API_URL}/expenses/`),
      ]);

      // Check each response individually for better error handling
      if (!incomeTotalRes.ok) {
        const errorData = await incomeTotalRes.json();
        throw new Error(errorData.error || `Failed to fetch income total: ${incomeTotalRes.statusText}`);
      }
      if (!expenseTotalRes.ok) {
        const errorData = await expenseTotalRes.json();
        throw new Error(errorData.error || `Failed to fetch expense total: ${expenseTotalRes.statusText}`);
      }
      if (!incomesRes.ok) {
        const errorData = await incomesRes.json();
        throw new Error(errorData.error || `Failed to fetch incomes: ${incomesRes.statusText}`);
      }
      if (!expensesRes.ok) {
        const errorData = await expensesRes.json();
        throw new Error(errorData.error || `Failed to fetch expenses: ${expensesRes.statusText}`);
      }

      const incomeTotalData: IncomeTotalResponse = await incomeTotalRes.json();
      const expenseTotalData: ExpenseTotalResponse = await expenseTotalRes.json();
      const incomes: Income[] = await incomesRes.json();
      const expenses: Expense[] = await expensesRes.json();

      // Check for API errors
      if (incomeTotalData.status === 'error') {
        throw new Error(incomeTotalData.error || 'Failed to fetch income total');
      }
      if (expenseTotalData.status === 'error') {
        throw new Error(expenseTotalData.error || 'Failed to fetch expense total');
      }

      // Process data with error handling
      try {
        setTotalIncome(parseFloat(incomeTotalData.total_income));
        setTotalExpense(parseFloat(expenseTotalData.total_expenses));
      } catch (err) {
        console.error('Error parsing financial totals:', err);
        throw new Error('Failed to process financial totals');
      }

      // Process monthly data with error handling
      try {
        const monthlyMap = new Map<string, { income: number; expense: number }>();

        incomes.forEach(item => {
          try {
            const monthYear = moment(item.date).format('YYYY-MM');
            if (!monthlyMap.has(monthYear)) {
              monthlyMap.set(monthYear, { income: 0, expense: 0 });
            }
            monthlyMap.get(monthYear)!.income += parseFloat(item.amount);
          } catch (err) {
            console.error('Error processing income item:', err);
          }
        });

        expenses.forEach(item => {
          try {
            const monthYear = moment(item.date).format('YYYY-MM');
            if (!monthlyMap.has(monthYear)) {
              monthlyMap.set(monthYear, { income: 0, expense: 0 });
            }
            monthlyMap.get(monthYear)!.expense += parseFloat(item.amount);
          } catch (err) {
            console.error('Error processing expense item:', err);
          }
        });

        const sortedMonthlyData = Array.from(monthlyMap.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => ({
            month: moment(key).format('MMMM'),
            income: value.income,
            expense: value.expense,
          }));

        setMonthlyData(sortedMonthlyData);
      } catch (err) {
        console.error('Error processing monthly data:', err);
        throw new Error('Failed to process monthly financial data');
      }

      // Process category data
      try {
        const incomeCategoryMap = new Map<string, number>();
        incomes.forEach(item => {
          const categoryName = item.category?.name || 'অন্যান্য';
          incomeCategoryMap.set(categoryName, (incomeCategoryMap.get(categoryName) || 0) + parseFloat(item.amount));
        });

        const expenseCategoryMap = new Map<string, number>();
        expenses.forEach(item => {
          const categoryName = item.category?.name || 'অন্যান্য';
          expenseCategoryMap.set(categoryName, (expenseCategoryMap.get(categoryName) || 0) + parseFloat(item.amount));
        });

        const incomeBreakdown = Array.from(incomeCategoryMap.entries())
          .map(([categoryName, total]) => ({ name: categoryName, value: total }))
          .filter(item => item.value > 0);

        const expenseBreakdown = Array.from(expenseCategoryMap.entries())
          .map(([categoryName, total]) => ({ name: categoryName, value: total }))
          .filter(item => item.value > 0);

        const incomeBreakdownWithColors = incomeBreakdown.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length]
        }));
        const expenseBreakdownWithColors = expenseBreakdown.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length]
        }));

        setIncomeCategoriesData(incomeBreakdownWithColors);
        setExpenseCategoriesData(expenseBreakdownWithColors);
      } catch (err) {
        console.error('Error processing category data:', err);
        throw new Error('Failed to process category data');
      }

    } catch (err) {
      console.error('Error fetching financial data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load financial report. Please try again later.');
      toast({
        title: "আর্থিক প্রতিবেদন লোড করতে ব্যর্থ হয়েছে",
        description: err instanceof Error ? err.message : "দুঃখিত, আর্থিক প্রতিবেদন লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]); // Fetch data on mount and when fetchFinancialData changes


  const netBalance = totalIncome - totalExpense;

  if (loading) {
    return (
      <MainLayout>
        <section className="bg-islamic-green text-white py-10 mb-10">
          <div className="container-custom text-center">
            <h1 className="bengali-text text-3xl md:text-4xl font-bold">আর্থিক প্রতিবেদন</h1>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="bengali-text text-white text-center mt-2">লোড হচ্ছে...</p>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <section className="bg-islamic-green text-white py-10 mb-10">
          <div className="container-custom text-center">
            <h1 className="bengali-text text-3xl md:text-4xl font-bold">আর্থিক প্রতিবেদন</h1>
            <p className="bengali-text text-white text-center mt-2 text-red-300">{error}</p>
             <Button 
              onClick={fetchFinancialData}
              disabled={isRefreshing}
              className="mt-4 bg-white text-islamic-green hover:bg-gray-100"
            >
              <RotateCcw size={20} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              পুনরায় লোড করুন
            </Button>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-islamic-green py-10 mb-10">
        <div className="container-custom flex justify-between items-center">
          <div>
            <h1 className="bengali-text text-white text-3xl md:text-4xl font-bold">আর্থিক প্রতিবেদন</h1>
            {/* You might want to fetch and display the event date dynamically */}
            <p className="bengali-text text-white text-center md:text-left mt-2">৩০ বছর পূর্তি উৎসব - ১২ জুন, ২০২৫</p>
          </div>
          <Button 
            onClick={fetchFinancialData}
            disabled={isRefreshing}
            className="bg-white text-islamic-green hover:bg-gray-100"
          >
             <RotateCcw size={20} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            পুনরায় লোড করুন
          </Button>
        </div>
      </div>

      <div className="container-custom pb-16">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="islamic-card">
            <CardHeader className="pb-2">
              <CardTitle className="bengali-text text-xl text-islamic-green">মোট আয়</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="bengali-text text-3xl font-bold text-green-600">{totalIncome.toLocaleString()}৳</p>
            </CardContent>
          </Card>
          
          <Card className="islamic-card">
            <CardHeader className="pb-2">
              <CardTitle className="bengali-text text-xl text-islamic-green">মোট ব্যয়</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="bengali-text text-3xl font-bold text-red-600">{totalExpense.toLocaleString()}৳</p>
            </CardContent>
          </Card>
          
          <Card className="islamic-card">
            <CardHeader className="pb-2">
              <CardTitle className="bengali-text text-xl text-islamic-green">নিট ব্যালেন্স</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`bengali-text text-3xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netBalance >= 0 ? '+' : ''}{netBalance.toLocaleString()}৳
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Income vs Expense Chart */}
        <Card className="islamic-card mb-8">
          <CardHeader>
            <CardTitle className="bengali-text text-2xl text-islamic-green">মাসিক আয় বনাম ব্যয়</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" className="bengali-text" />
                <YAxis className="bengali-text" />
                <Tooltip 
                  labelClassName="bengali-text"
                    formatter={(value: number, name: string) => [
                    `${value.toLocaleString()}৳`, 
                    name === 'income' ? 'আয়' : 'ব্যয়'
                  ]}
                />
                <Legend 
                  formatter={(value) => value === 'income' ? 'আয়' : 'ব্যয়'}
                />
                <Bar dataKey="income" fill="#10b981" />
                <Bar dataKey="expense" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
            ) : (monthlyData.length === 0 && !loading && !error) ? (
              <p className="bengali-text text-center text-gray-600">মাসিক ডেটা উপলব্ধ নেই।</p>
            ) : null}
          </CardContent>
        </Card>

        {/* Income and Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Breakdown */}
          <Card className="islamic-card">
            <CardHeader>
              <CardTitle className="bengali-text text-2xl text-islamic-green">আয়ের বিভাগ</CardTitle>
            </CardHeader>
            <CardContent>
              {incomeCategoriesData.length > 0 ? (
                <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                        data={incomeCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                        {incomeCategoriesData.map((entry, index) => (
                          <Cell key={`cell-income-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                      <Tooltip formatter={(value: number) => `${value.toLocaleString()}৳`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                    {incomeCategoriesData.map((category, index) => (
                      <div key={`income-legend-${index}`} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded mr-2" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="bengali-text">{category.name}</span>
                    </div>
                    <span className="bengali-text font-medium">{category.value.toLocaleString()}৳</span>
                  </div>
                ))}
              </div>
                </>
              ) : (incomeCategoriesData.length === 0 && !loading && !error) ? (
                <p className="bengali-text text-center text-gray-600">আয়ের বিভাগের ডেটা উপলব্ধ নেই।</p>
              ) : null}
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card className="islamic-card">
            <CardHeader>
              <CardTitle className="bengali-text text-2xl text-islamic-green">ব্যয়ের বিভাগ</CardTitle>
            </CardHeader>
            <CardContent>
            {expenseCategoriesData.length > 0 ? (
                <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                        data={expenseCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                        {expenseCategoriesData.map((entry, index) => (
                          <Cell key={`expense-legend-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                       <Tooltip formatter={(value: number) => `${value.toLocaleString()}৳`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                    {expenseCategoriesData.map((category, index) => (
                      <div key={`expense-legend-${index}`} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded mr-2" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="bengali-text">{category.name}</span>
                    </div>
                    <span className="bengali-text font-medium">{category.value.toLocaleString()}৳</span>
                  </div>
                ))}
              </div>
                </>
              ) : (expenseCategoriesData.length === 0 && !loading && !error) ? (
                <p className="bengali-text text-center text-gray-600">ব্যয়ের বিভাগের ডেটা উপলব্ধ নেই।</p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default FinancialReport;
