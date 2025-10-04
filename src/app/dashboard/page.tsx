'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Trophy, 
  Target, 
  Droplets, 
  Utensils, 
  Dumbbell, 
  Flame, 
  Star, 
  CheckCircle, 
  Lock,
  TrendingUp,
  Award,
  Zap,
  Heart,
  Clock,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
  Check,
  User,
  Scale,
  Activity,
  ArrowUp,
  ArrowDown,
  X
} from 'lucide-react'

interface UserData {
  gender: string
  bodyType: string
  goal: string
  age: string
  height: string
  weight: string
  targetWeight: string
  activityLevel: string
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentDay, setCurrentDay] = useState(1)
  const [waterIntake, setWaterIntake] = useState(0)
  const [caloriesConsumed, setCaloriesConsumed] = useState(0)
  const [userLevel, setUserLevel] = useState(1)
  const [userXP, setUserXP] = useState(0)
  const [streak, setStreak] = useState(1)
  const [activeWorkout, setActiveWorkout] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('home')
  const [restTimer, setRestTimer] = useState(0)
  const [isRestActive, setIsRestActive] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [completedMeals, setCompletedMeals] = useState<number[]>([])

  // Carregar dados do usuário
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  // Calcular IMC
  const calculateBMI = () => {
    if (!userData?.height || !userData?.weight) return 0
    const heightInM = parseFloat(userData.height) / 100
    const weightInKg = parseFloat(userData.weight)
    return (weightInKg / (heightInM * heightInM)).toFixed(1)
  }

  // Calcular metas personalizadas baseadas no usuário
  const getPersonalizedGoals = () => {
    if (!userData) return { water: 2000, calories: 1800, targetWeight: 70 }
    
    const weight = parseFloat(userData.weight)
    const targetWeight = parseFloat(userData.targetWeight)
    const age = parseInt(userData.age.split('-')[0])
    
    // Cálculo de água baseado no peso (35ml por kg)
    const waterGoal = Math.round(weight * 35)
    
    // Cálculo de calorias baseado em TMB e objetivo
    let calorieGoal = 1800
    if (userData.gender === 'masculino') {
      calorieGoal = Math.round(88.362 + (13.397 * weight) + (4.799 * parseFloat(userData.height)) - (5.677 * age))
    } else {
      calorieGoal = Math.round(447.593 + (9.247 * weight) + (3.098 * parseFloat(userData.height)) - (4.330 * age))
    }
    
    // Ajustar baseado no objetivo
    if (userData.goal === 'perder-peso') {
      calorieGoal = Math.round(calorieGoal * 0.8) // Déficit de 20%
    } else if (userData.goal === 'ganhar-massa') {
      calorieGoal = Math.round(calorieGoal * 1.2) // Superávit de 20%
    }
    
    return { 
      water: waterGoal, 
      calories: calorieGoal, 
      targetWeight: targetWeight 
    }
  }

  const dailyGoals = getPersonalizedGoals()

  // Treinos personalizados baseados no objetivo
  const getPersonalizedWorkouts = () => {
    if (!userData) return []
    
    const baseWorkouts = [
      { day: 1, unlocked: true },
      { day: 2, unlocked: currentDay >= 2 },
      { day: 3, unlocked: currentDay >= 3 },
      { day: 4, unlocked: currentDay >= 4 },
      { day: 5, unlocked: currentDay >= 5 },
      { day: 6, unlocked: currentDay >= 6 },
      { day: 7, unlocked: currentDay >= 7 }
    ]

    if (userData.goal === 'perder-peso') {
      return baseWorkouts.map(w => ({
        ...w,
        type: ['Cardio HIIT', 'Queima Gordura', 'Cardio Intenso', 'HIIT Avançado', 'Cardio + Core', 'Funcional', 'Cardio Longo'][w.day - 1],
        duration: ['25 min', '30 min', '35 min', '40 min', '30 min', '45 min', '50 min'][w.day - 1],
        calories: [300, 350, 400, 450, 320, 380, 500][w.day - 1]
      }))
    } else if (userData.goal === 'ganhar-massa') {
      return baseWorkouts.map(w => ({
        ...w,
        type: ['Peito + Tríceps', 'Costas + Bíceps', 'Pernas', 'Ombros', 'Braços', 'Core + Cardio', 'Full Body'][w.day - 1],
        duration: ['45 min', '50 min', '60 min', '40 min', '45 min', '35 min', '55 min'][w.day - 1],
        calories: [250, 280, 350, 220, 240, 200, 320][w.day - 1]
      }))
    } else {
      return baseWorkouts.map(w => ({
        ...w,
        type: ['Cardio + Força', 'Força Superior', 'Cardio Moderado', 'Força Inferior', 'Funcional', 'Yoga + Core', 'Treino Completo'][w.day - 1],
        duration: ['40 min', '45 min', '35 min', '50 min', '40 min', '30 min', '55 min'][w.day - 1],
        calories: [280, 300, 250, 320, 270, 180, 350][w.day - 1]
      }))
    }
  }

  // Dietas personalizadas baseadas no objetivo
  const getPersonalizedMeals = () => {
    if (!userData) return []
    
    const baseMeals = [
      { day: 1, unlocked: true },
      { day: 2, unlocked: currentDay >= 2 },
      { day: 3, unlocked: currentDay >= 3 },
      { day: 4, unlocked: currentDay >= 4 },
      { day: 5, unlocked: currentDay >= 5 },
      { day: 6, unlocked: currentDay >= 6 },
      { day: 7, unlocked: currentDay >= 7 }
    ]

    if (userData.goal === 'perder-peso') {
      const lowCalMeals = [
        ["Aveia com frutas vermelhas", "Salada verde com frango", "Peixe grelhado com legumes", "Chá verde"],
        ["Smoothie detox", "Sopa de legumes", "Salmão com brócolis", "Iogurte natural"],
        ["Ovos mexidos com espinafre", "Quinoa com vegetais", "Frango grelhado", "Frutas vermelhas"],
        ["Tapioca com queijo", "Salada completa", "Peixe no vapor", "Castanhas"],
        ["Vitamina verde", "Wrap integral light", "Carne magra grelhada", "Chá de ervas"],
        ["Panqueca fit", "Salada de atum", "Frango ao curry light", "Iogurte com granola"],
        ["Açaí natural", "Sopa detox", "Salmão teriyaki", "Frutas da estação"]
      ]
      return baseMeals.map((meal, index) => ({
        ...meal,
        meals: lowCalMeals[index],
        calories: [350, 380, 420, 400, 360, 390, 410][index]
      }))
    } else if (userData.goal === 'ganhar-massa') {
      const highProteinMeals = [
        ["Aveia com whey e banana", "Frango com batata doce", "Carne vermelha com arroz", "Shake proteico"],
        ["Ovos com pão integral", "Salmão com quinoa", "Frango com macarrão", "Castanhas e frutas"],
        ["Panqueca proteica", "Carne com legumes", "Peixe com batata", "Iogurte com granola"],
        ["Vitamina com whey", "Frango grelhado", "Carne com arroz integral", "Mix de oleaginosas"],
        ["Tapioca com queijo", "Salmão grelhado", "Frango com batata doce", "Shake pós-treino"],
        ["Ovos com abacate", "Carne com salada", "Peixe com legumes", "Frutas com pasta de amendoim"],
        ["Açaí com granola", "Frango com quinoa", "Carne com vegetais", "Leite com aveia"]
      ]
      return baseMeals.map((meal, index) => ({
        ...meal,
        meals: highProteinMeals[index],
        calories: [550, 580, 620, 600, 560, 590, 610][index]
      }))
    } else {
      const balancedMeals = [
        ["Aveia com frutas", "Salada com proteína", "Peixe com legumes", "Iogurte natural"],
        ["Smoothie equilibrado", "Quinoa com frango", "Salmão grelhado", "Frutas secas"],
        ["Ovos com vegetais", "Wrap saudável", "Carne magra", "Castanhas"],
        ["Panqueca integral", "Salada completa", "Frango ao forno", "Chá com biscoitos"],
        ["Vitamina natural", "Sopa nutritiva", "Peixe assado", "Iogurte com frutas"],
        ["Tapioca saudável", "Salada de grãos", "Carne grelhada", "Mix de frutas"],
        ["Açaí equilibrado", "Prato balanceado", "Salmão com quinoa", "Lanche saudável"]
      ]
      return baseMeals.map((meal, index) => ({
        ...meal,
        meals: balancedMeals[index],
        calories: [450, 480, 520, 500, 460, 490, 510][index]
      }))
    }
  }

  const weeklyWorkouts = getPersonalizedWorkouts()
  const weeklyMeals = getPersonalizedMeals()

  const achievements = [
    { id: 1, title: "Primeiro Passo", description: "Complete seu primeiro dia", icon: Trophy, completed: currentDay >= 1 },
    { id: 2, title: "Hidratação", description: "Beba sua meta de água", icon: Droplets, completed: waterIntake >= dailyGoals.water },
    { id: 3, title: "Queimador", description: "Complete um treino", icon: Flame, completed: completedExercises.length > 0 },
    { id: 4, title: "Disciplina", description: "7 dias consecutivos", icon: Award, completed: currentDay >= 7 }
  ]

  const workoutExercises = [
    {
      id: 1,
      name: userData?.goal === 'perder-peso' ? "Burpees" : userData?.goal === 'ganhar-massa' ? "Flexões" : "Agachamentos",
      sets: userData?.goal === 'perder-peso' ? "4x8" : userData?.goal === 'ganhar-massa' ? "3x12" : "3x15",
      rest: 60,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: userData?.goal === 'perder-peso' ? "Movimento explosivo para queimar calorias" : userData?.goal === 'ganhar-massa' ? "Foque na contração muscular" : "Mantenha a postura correta"
    },
    {
      id: 2,
      name: userData?.goal === 'perder-peso' ? "Mountain Climbers" : userData?.goal === 'ganhar-massa' ? "Supino" : "Prancha",
      sets: userData?.goal === 'perder-peso' ? "4x20" : userData?.goal === 'ganhar-massa' ? "4x8" : "3x30s",
      rest: userData?.goal === 'perder-peso' ? 45 : userData?.goal === 'ganhar-massa' ? 120 : 60,
      image: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop",
      description: userData?.goal === 'perder-peso' ? "Mantenha o ritmo acelerado" : userData?.goal === 'ganhar-massa' ? "Controle a descida" : "Core contraído"
    }
  ]

  // Timer de descanso
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRestActive && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1)
      }, 1000)
    } else if (restTimer === 0 && isRestActive) {
      setIsRestActive(false)
    }
    return () => clearInterval(interval)
  }, [isRestActive, restTimer])

  const startRestTimer = (seconds: number) => {
    setRestTimer(seconds)
    setIsRestActive(true)
  }

  const toggleExerciseComplete = (exerciseId: number) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    )
    
    if (!completedExercises.includes(exerciseId)) {
      setUserXP(prev => prev + 25)
      // Verificar se pode subir de nível
      if (userXP + 25 >= userLevel * 100) {
        setUserLevel(prev => prev + 1)
        setUserXP(0)
      }
    }
  }

  const toggleMealComplete = (mealIndex: number) => {
    setCompletedMeals(prev => 
      prev.includes(mealIndex) 
        ? prev.filter(id => id !== mealIndex)
        : [...prev, mealIndex]
    )
    
    if (!completedMeals.includes(mealIndex)) {
      setUserXP(prev => prev + 15)
    }
  }

  const addWater = (amount: number) => {
    setWaterIntake(prev => Math.min(prev + amount, dailyGoals.water + 1000))
  }

  const removeWater = (amount: number) => {
    setWaterIntake(prev => Math.max(prev - amount, 0))
  }

  const addCalories = (amount: number) => {
    setCaloriesConsumed(prev => Math.min(prev + amount, dailyGoals.calories + 1000))
  }

  const removeCalories = (amount: number) => {
    setCaloriesConsumed(prev => Math.max(prev - amount, 0))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressToGoal = () => {
    if (!userData) return { current: 0, target: 0, remaining: 0, percentage: 0 }
    
    const current = parseFloat(userData.weight)
    const target = parseFloat(userData.targetWeight)
    const remaining = Math.abs(current - target)
    const totalChange = Math.abs(parseFloat(userData.weight) - target)
    const percentage = totalChange > 0 ? Math.min(((totalChange - remaining) / totalChange) * 100, 100) : 100
    
    return { current, target, remaining, percentage }
  }

  const progress = getProgressToGoal()

  const getGoalText = () => {
    if (!userData) return "Definir objetivo"
    
    switch (userData.goal) {
      case 'perder-peso':
        return `Perder ${progress.remaining.toFixed(1)}kg`
      case 'ganhar-massa':
        return `Ganhar ${progress.remaining.toFixed(1)}kg`
      default:
        return `Manter ${progress.target}kg`
    }
  }

  const canAdvanceDay = () => {
    const todayWorkout = weeklyWorkouts.find(w => w.day === currentDay)
    const todayMeals = weeklyMeals.find(m => m.day === currentDay)
    
    return (
      waterIntake >= dailyGoals.water * 0.8 && // 80% da meta de água
      completedExercises.length >= 1 && // Pelo menos 1 exercício
      completedMeals.length >= 2 // Pelo menos 2 refeições
    )
  }

  const advanceDay = () => {
    if (canAdvanceDay() && currentDay < 7) {
      setCurrentDay(prev => prev + 1)
      setStreak(prev => prev + 1)
      setUserXP(prev => prev + 100) // Bônus por completar o dia
      
      // Reset diário
      setWaterIntake(0)
      setCaloriesConsumed(0)
      setCompletedExercises([])
      setCompletedMeals([])
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu perfil personalizado...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header Responsivo */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-4">
            {/* Saudação e Info Principal */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Olá, {userData.gender === 'masculino' ? 'Guerreiro' : 'Guerreira'}! 👋
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  Nível {userLevel} • Dia {currentDay} da sua transformação
                </p>
              </div>
              
              {/* Stats Compactos */}
              <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center flex-1 sm:flex-none">
                  <div className="flex items-center gap-1 mb-1 justify-center">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="text-xs">XP</span>
                  </div>
                  <div className="text-lg font-bold">{userXP}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center flex-1 sm:flex-none">
                  <div className="flex items-center gap-1 mb-1 justify-center">
                    <Flame className="w-4 h-4 text-red-300" />
                    <span className="text-xs">Seq</span>
                  </div>
                  <div className="text-lg font-bold">{streak}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center flex-1 sm:flex-none">
                  <div className="flex items-center gap-1 mb-1 justify-center">
                    <Scale className="w-4 h-4 text-green-300" />
                    <span className="text-xs">IMC</span>
                  </div>
                  <div className="text-lg font-bold">{calculateBMI()}</div>
                </div>
              </div>
            </div>
            
            {/* Objetivo Personalizado */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Seu Objetivo</h3>
                <Target className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">{getGoalText()}</p>
                  <p className="text-xs text-blue-100">
                    Peso atual: {userData.weight}kg → Meta: {userData.targetWeight}kg
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-300">
                    {progress.percentage.toFixed(0)}%
                  </div>
                  <div className="text-xs">Progresso</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Barra de Progresso do Nível */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Nível {userLevel}</span>
                <span>{userXP}/{userLevel * 100} XP</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userXP / (userLevel * 100)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação por Abas - Mobile First */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'home', label: 'Início', icon: Activity },
              { id: 'workout', label: 'Treino', icon: Dumbbell },
              { id: 'meals', label: 'Refeições', icon: Utensils },
              { id: 'achievements', label: 'Conquistas', icon: Trophy },
              { id: 'progress', label: 'Progresso', icon: TrendingUp }
            ].map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Timer de Descanso Ativo */}
        {isRestActive && (
          <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-2xl animate-pulse">
            <div className="text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{formatTime(restTimer)}</div>
              <div className="text-xs">Descanso</div>
            </div>
          </div>
        )}

        {/* Conteúdo baseado na aba ativa */}
        {activeTab === 'home' && (
          <>
            {/* Metas Diárias - Grid Responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Água */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
                      <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Água</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{waterIntake}ml / {dailyGoals.water}ml</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((waterIntake / dailyGoals.water) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => addWater(250)}
                    className="bg-blue-600 text-white py-2 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    250ml
                  </button>
                  <button 
                    onClick={() => removeWater(250)}
                    className="bg-red-500 text-white py-2 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <Minus className="w-3 h-3" />
                    250ml
                  </button>
                </div>
              </div>

              {/* Calorias */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-3 bg-orange-100 rounded-xl">
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Calorias</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{caloriesConsumed} / {dailyGoals.calories}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-red-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((caloriesConsumed / dailyGoals.calories) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => addCalories(100)}
                    className="bg-orange-600 text-white py-2 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    100
                  </button>
                  <button 
                    onClick={() => removeCalories(100)}
                    className="bg-red-500 text-white py-2 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <Minus className="w-3 h-3" />
                    100
                  </button>
                </div>
              </div>

              {/* Treino do Dia */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-xl">
                    <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Treino Hoje</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{weeklyWorkouts[currentDay - 1]?.type}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Duração:</span>
                    <span className="font-medium">{weeklyWorkouts[currentDay - 1]?.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Calorias:</span>
                    <span className="font-medium">{weeklyWorkouts[currentDay - 1]?.calories} kcal</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('workout')}
                  className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Iniciar Treino
                </button>
              </div>

              {/* Progresso do Dia */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-xl">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Progresso</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Dia {currentDay}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Água</span>
                    <div className="flex items-center gap-2">
                      {waterIntake >= dailyGoals.water * 0.8 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Exercícios</span>
                    <div className="flex items-center gap-2">
                      {completedExercises.length >= 1 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Refeições</span>
                    <div className="flex items-center gap-2">
                      {completedMeals.length >= 2 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                  </div>
                </div>
                
                {canAdvanceDay() && currentDay < 7 && (
                  <button 
                    onClick={advanceDay}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all text-sm"
                  >
                    Avançar Dia
                  </button>
                )}
              </div>
            </div>

            {/* Resumo Semanal - Mobile Friendly */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Treinos Semanais */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Dumbbell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Treinos da Semana</h2>
                    <p className="text-gray-600 text-sm">Personalizados para {userData.goal === 'perder-peso' ? 'emagrecimento' : userData.goal === 'ganhar-massa' ? 'ganho de massa' : 'manutenção'}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {weeklyWorkouts.map((workout) => (
                    <div 
                      key={workout.day}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                        workout.day === currentDay
                          ? 'border-blue-500 bg-blue-50'
                          : workout.unlocked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                            workout.day === currentDay
                              ? 'bg-blue-600 text-white'
                              : workout.unlocked ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
                          }`}>
                            {workout.day}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">Dia {workout.day}</span>
                            <p className="text-xs sm:text-sm text-gray-600">{workout.type}</p>
                          </div>
                        </div>
                        
                        {workout.unlocked ? (
                          workout.day === currentDay ? (
                            <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                              Hoje
                            </div>
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      
                      {workout.unlocked && (
                        <div className="flex justify-between text-xs mt-2 text-gray-600">
                          <span>⏱️ {workout.duration}</span>
                          <span>🔥 {workout.calories} kcal</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dietas Semanais */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Utensils className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Cardápio da Semana</h2>
                    <p className="text-gray-600 text-sm">Adaptado para seu objetivo</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {weeklyMeals.map((dayPlan) => (
                    <div 
                      key={dayPlan.day}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                        dayPlan.day === currentDay
                          ? 'border-green-500 bg-green-50'
                          : dayPlan.unlocked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                            dayPlan.day === currentDay
                              ? 'bg-green-600 text-white'
                              : dayPlan.unlocked ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
                          }`}>
                            {dayPlan.day}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">Dia {dayPlan.day}</span>
                            {dayPlan.unlocked && (
                              <p className="text-xs text-gray-600">{dayPlan.calories} kcal total</p>
                            )}
                          </div>
                        </div>
                        
                        {dayPlan.unlocked ? (
                          dayPlan.day === currentDay ? (
                            <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                              Hoje
                            </div>
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      
                      {dayPlan.unlocked ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {dayPlan.meals.slice(0, 2).map((meal, index) => (
                            <div key={index} className="text-xs text-gray-700 bg-white p-2 rounded-lg">
                              {meal}
                            </div>
                          ))}
                          <div className="text-xs text-gray-500 col-span-full text-center">
                            +{dayPlan.meals.length - 2} refeições
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Desbloqueie no dia {dayPlan.day}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'workout' && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {weeklyWorkouts[currentDay - 1]?.type}
              </h2>
              <button 
                onClick={() => setActiveTab('home')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Voltar
              </button>
            </div>
            
            <div className="space-y-6">
              {workoutExercises.map((exercise) => (
                <div key={exercise.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Imagem do Exercício */}
                    <div className="relative">
                      <img 
                        src={exercise.image} 
                        alt={exercise.name}
                        className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Detalhes do Exercício */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{exercise.name}</h3>
                        <button
                          onClick={() => toggleExerciseComplete(exercise.id)}
                          className={`p-3 rounded-full transition-all transform hover:scale-110 ${
                            completedExercises.includes(exercise.id)
                              ? 'bg-green-500 text-white shadow-lg'
                              : 'bg-gray-200 text-gray-500 hover:bg-green-100'
                          }`}
                        >
                          <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <div className="bg-blue-100 px-3 py-1 rounded-full">
                            <span className="text-blue-800 font-semibold text-sm">{exercise.sets}</span>
                          </div>
                          <div className="bg-orange-100 px-3 py-1 rounded-full">
                            <span className="text-orange-800 font-semibold text-sm">{exercise.rest}s descanso</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 text-sm sm:text-base">{exercise.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => startRestTimer(exercise.rest)}
                            disabled={isRestActive}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                              isRestActive 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                            }`}
                          >
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                            Iniciar Descanso
                          </button>
                          
                          {completedExercises.includes(exercise.id) && (
                            <div className="flex items-center bg-green-100 px-4 py-2 rounded-xl justify-center sm:justify-start">
                              <span className="text-green-800 font-semibold text-sm">+25 XP</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Progresso do Treino */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Progresso do Treino</h3>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">
                    {completedExercises.length}/{workoutExercises.length}
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 sm:h-4 mb-4">
                    <div 
                      className="bg-white h-3 sm:h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(completedExercises.length / workoutExercises.length) * 100}%` }}
                    ></div>
                  </div>
                  {completedExercises.length === workoutExercises.length && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-yellow-300" />
                      <p className="font-semibold">Parabéns! Treino Completo!</p>
                      <p className="text-sm opacity-90">+100 XP Bônus</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Utensils className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Cardápio do Dia {currentDay}</h2>
                  <p className="text-gray-600">Personalizado para {userData.goal === 'perder-peso' ? 'emagrecimento' : userData.goal === 'ganhar-massa' ? 'ganho de massa' : 'manutenção'}</p>
                </div>
              </div>
              
              {weeklyMeals[currentDay - 1]?.unlocked ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {weeklyMeals[currentDay - 1].meals.map((meal, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        completedMeals.includes(index)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                      onClick={() => toggleMealComplete(index)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800">
                          {['Café da Manhã', 'Almoço', 'Jantar', 'Lanche'][index]}
                        </h3>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          completedMeals.includes(index)
                            ? 'bg-green-500 text-white'
                            : 'border-2 border-gray-300'
                        }`}>
                          {completedMeals.includes(index) && <Check className="w-4 h-4" />}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{meal}</p>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          ~{Math.round(weeklyMeals[currentDay - 1].calories / 4)} kcal
                        </span>
                        {completedMeals.includes(index) && (
                          <span className="text-green-600 font-semibold">+15 XP</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Cardápio Bloqueado</h3>
                  <p className="text-gray-500">Complete os dias anteriores para desbloquear</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Conquistas</h2>
                <p className="text-gray-600">Desbloqueie medalhas e ganhe XP extra</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon
                return (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      achievement.completed 
                        ? 'border-yellow-200 bg-yellow-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        achievement.completed ? 'bg-yellow-600' : 'bg-gray-400'
                      }`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                      {achievement.completed && (
                        <div className="mt-2">
                          <span className="inline-block bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                            +50 XP
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Estatísticas Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Scale className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Progresso de Peso</h3>
                    <p className="text-2xl font-bold text-red-600">
                      {userData.goal === 'perder-peso' ? '-' : '+'}
                      {Math.abs(parseFloat(userData.weight) - parseFloat(userData.targetWeight)).toFixed(1)} kg
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Atual: {userData.weight}kg</span>
                    <span>Meta: {userData.targetWeight}kg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">
                    {progress.percentage.toFixed(0)}% do objetivo alcançado
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Treinos Completos</h3>
                    <p className="text-2xl font-bold text-green-600">{currentDay - 1}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Dias de treino consecutivos</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">IMC Atual</h3>
                    <p className="text-2xl font-bold text-blue-600">{calculateBMI()}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {parseFloat(calculateBMI()) < 18.5 ? 'Abaixo do peso' :
                   parseFloat(calculateBMI()) < 25 ? 'Peso normal' :
                   parseFloat(calculateBMI()) < 30 ? 'Sobrepeso' : 'Obesidade'}
                </p>
              </div>
            </div>

            {/* Gráfico de Progresso Semanal */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Progresso Semanal</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
                  <div key={day} className="text-center">
                    <div className={`w-full h-20 rounded-lg mb-2 flex items-end justify-center ${
                      day <= currentDay ? 'bg-gradient-to-t from-blue-500 to-blue-300' : 'bg-gray-200'
                    }`}>
                      <div className="text-white font-bold text-sm mb-2">
                        {day <= currentDay ? '✓' : ''}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">Dia {day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}