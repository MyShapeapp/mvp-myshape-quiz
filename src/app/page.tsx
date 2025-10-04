'use client';

import { useState, useEffect } from 'react';
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
  Settings,
  Home,
  BarChart3,
  Medal,
  ChevronRight,
  Timer,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function Dashboard() {
  const [currentDay, setCurrentDay] = useState(1);
  const [waterIntake, setWaterIntake] = useState(1200);
  const [caloriesConsumed, setCaloriesConsumed] = useState(850);
  const [userLevel, setUserLevel] = useState(3);
  const [userXP, setUserXP] = useState(750);
  const [streak, setStreak] = useState(7);
  const [activeWorkout, setActiveWorkout] = useState<number | null>(null);
  const [restTimer, setRestTimer] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const dailyGoals = {
    water: 2500, // ml
    calories: 1800,
    workout: true,
    meals: 4
  };

  const achievements = [
    { id: 1, title: "Primeira Semana", description: "Complete 7 dias consecutivos", icon: Trophy, completed: true, xp: 100 },
    { id: 2, title: "Hidratação Master", description: "Beba 2.5L de água por 5 dias", icon: Droplets, completed: true, xp: 75 },
    { id: 3, title: "Queimador de Calorias", description: "Queime 500 calorias em um treino", icon: Flame, completed: false, xp: 150 },
    { id: 4, title: "Disciplina Total", description: "Complete 30 dias consecutivos", icon: Award, completed: false, xp: 300 },
    { id: 5, title: "Força Máxima", description: "Complete 50 exercícios de força", icon: Dumbbell, completed: false, xp: 200 },
    { id: 6, title: "Nutrição Perfeita", description: "Siga o plano alimentar por 14 dias", icon: Utensils, completed: false, xp: 250 }
  ];

  const weeklyMeals = [
    { day: 1, unlocked: true, meals: ["Aveia com frutas", "Salada de frango", "Salmão grelhado", "Iogurte natural"] },
    { day: 2, unlocked: true, meals: ["Smoothie verde", "Quinoa com legumes", "Peixe assado", "Castanhas"] },
    { day: 3, unlocked: true, meals: ["Ovos mexidos", "Wrap integral", "Frango grelhado", "Frutas vermelhas"] },
    { day: 4, unlocked: currentDay >= 4, meals: ["Panqueca fit", "Salada caesar", "Carne magra", "Chá verde"] },
    { day: 5, unlocked: currentDay >= 5, meals: ["Açaí natural", "Sopa de legumes", "Peixe no vapor", "Nozes"] },
    { day: 6, unlocked: currentDay >= 6, meals: ["Tapioca", "Risoto de quinoa", "Frango ao curry", "Iogurte"] },
    { day: 7, unlocked: currentDay >= 7, meals: ["Vitamina", "Salada completa", "Salmão teriyaki", "Frutas"] }
  ];

  const workoutExercises = [
    {
      id: 1,
      name: "Flexões",
      sets: "3x12",
      rest: 60,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Mantenha o corpo reto, desça até o peito quase tocar o chão",
      calories: 45
    },
    {
      id: 2,
      name: "Agachamentos",
      sets: "3x15",
      rest: 90,
      image: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop",
      description: "Desça como se fosse sentar, mantenha os joelhos alinhados",
      calories: 60
    },
    {
      id: 3,
      name: "Prancha",
      sets: "3x30s",
      rest: 45,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Mantenha o corpo reto como uma tábua, contraindo o core",
      calories: 30
    },
    {
      id: 4,
      name: "Burpees",
      sets: "3x8",
      rest: 120,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop",
      description: "Movimento completo: agachamento, prancha, pulo",
      calories: 80
    }
  ];

  const weeklyWorkouts = [
    { day: 1, unlocked: true, type: "Cardio HIIT", duration: "30 min", calories: 350 },
    { day: 2, unlocked: true, type: "Força - Superiores", duration: "45 min", calories: 280 },
    { day: 3, unlocked: true, type: "Yoga Flow", duration: "40 min", calories: 200 },
    { day: 4, unlocked: currentDay >= 4, type: "Cardio Intenso", duration: "35 min", calories: 400 },
    { day: 5, unlocked: currentDay >= 5, type: "Força - Inferiores", duration: "50 min", calories: 320 },
    { day: 6, unlocked: currentDay >= 6, type: "Pilates Core", duration: "30 min", calories: 180 },
    { day: 7, unlocked: currentDay >= 7, type: "Treino Funcional", duration: "60 min", calories: 450 }
  ];

  // Timer de descanso
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRestActive && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && isRestActive) {
      setIsRestActive(false);
      if (soundEnabled) {
        // Som de notificação (simulado)
        console.log('🔔 Tempo de descanso finalizado!');
      }
    }
    return () => clearInterval(interval);
  }, [isRestActive, restTimer, soundEnabled]);

  const startRestTimer = (seconds: number) => {
    setRestTimer(seconds);
    setIsRestActive(true);
  };

  const toggleExerciseComplete = (exerciseId: number) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
    
    // Ganhar XP por completar exercício
    if (!completedExercises.includes(exerciseId)) {
      setUserXP(prev => prev + 25);
      
      // Verificar se completou todos os exercícios para bônus
      if (completedExercises.length + 1 === workoutExercises.length) {
        setUserXP(prev => prev + 100); // Bônus por completar treino
      }
    }
  };

  const addWater = (amount: number) => {
    setWaterIntake(prev => Math.min(prev + amount, dailyGoals.water));
    setUserXP(prev => prev + 5); // XP por hidratação
  };

  const addCalories = (amount: number) => {
    setCaloriesConsumed(prev => Math.min(prev + amount, dailyGoals.calories + 500));
    setUserXP(prev => prev + 3); // XP por registrar refeição
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'from-green-400 to-green-600';
    if (percentage >= 75) return 'from-blue-400 to-blue-600';
    if (percentage >= 50) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Timer de Descanso Ativo */}
            {isRestActive && (
              <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-2xl animate-pulse border-2 border-white/20">
                <div className="text-center">
                  <Timer className="w-10 h-10 mx-auto mb-3 animate-spin" />
                  <div className="text-3xl font-bold mb-1">{formatTime(restTimer)}</div>
                  <div className="text-sm opacity-90">Tempo de descanso</div>
                  <button 
                    onClick={() => setIsRestActive(false)}
                    className="mt-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs transition-colors"
                  >
                    Pular
                  </button>
                </div>
              </div>
            )}

            {/* Treino Detalhado */}
            {activeWorkout && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Treino do Dia</h2>
                    <p className="text-blue-600 font-semibold text-lg">{weeklyWorkouts[currentDay - 1]?.type}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`p-3 rounded-xl transition-colors ${soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                    </button>
                    <button 
                      onClick={() => setActiveWorkout(null)}
                      className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
                
                <div className="grid gap-8">
                  {workoutExercises.map((exercise) => (
                    <div key={exercise.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100 shadow-lg">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Imagem/GIF do Exercício */}
                        <div className="relative group">
                          <img 
                            src={exercise.image} 
                            alt={exercise.name}
                            className="w-full h-80 object-cover rounded-2xl shadow-xl"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-110">
                              <Play className="w-10 h-10 text-blue-600" />
                            </div>
                          </div>
                          
                          {/* Badge de Calorias */}
                          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            🔥 {exercise.calories} kcal
                          </div>
                        </div>
                        
                        {/* Detalhes do Exercício */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-bold text-gray-800">{exercise.name}</h3>
                            <button
                              onClick={() => toggleExerciseComplete(exercise.id)}
                              className={`p-4 rounded-full transition-all transform hover:scale-110 shadow-lg ${
                                completedExercises.includes(exercise.id)
                                  ? 'bg-green-500 text-white shadow-green-200'
                                  : 'bg-gray-200 text-gray-500 hover:bg-green-100'
                              }`}
                            >
                              <Check className="w-8 h-8" />
                            </button>
                          </div>
                          
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-6 mb-4">
                              <div className="bg-blue-100 px-4 py-2 rounded-full">
                                <span className="text-blue-800 font-bold text-lg">{exercise.sets}</span>
                              </div>
                              <div className="bg-orange-100 px-4 py-2 rounded-full">
                                <span className="text-orange-800 font-bold text-lg">{exercise.rest}s descanso</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{exercise.description}</p>
                            
                            <div className="flex gap-4">
                              <button
                                onClick={() => startRestTimer(exercise.rest)}
                                disabled={isRestActive}
                                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                                  isRestActive 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                                }`}
                              >
                                <Timer className="w-6 h-6 inline mr-3" />
                                Iniciar Descanso
                              </button>
                              
                              {completedExercises.includes(exercise.id) && (
                                <div className="flex items-center bg-green-100 px-6 py-4 rounded-2xl border-2 border-green-200">
                                  <Zap className="w-5 h-5 text-green-600 mr-2" />
                                  <span className="text-green-800 font-bold">+25 XP</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Progresso do Treino */}
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-3xl p-8 shadow-2xl">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">Progresso do Treino</h3>
                      <div className="text-5xl font-bold mb-4">
                        {completedExercises.length}/{workoutExercises.length}
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-6 mb-6">
                        <div 
                          className="bg-white h-6 rounded-full transition-all duration-500 shadow-lg"
                          style={{ width: `${(completedExercises.length / workoutExercises.length) * 100}%` }}
                        ></div>
                      </div>
                      {completedExercises.length === workoutExercises.length ? (
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                          <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                          <p className="font-bold text-xl mb-2">🎉 Parabéns! Treino Completo!</p>
                          <p className="text-lg opacity-90">+100 XP Bônus de Conclusão</p>
                        </div>
                      ) : (
                        <p className="text-lg opacity-90">Continue assim! Você está indo muito bem!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Metas Diárias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Água */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-100 rounded-2xl">
                      <Droplets className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Água</h3>
                      <p className="text-sm text-gray-500">{waterIntake}ml / {dailyGoals.water}ml</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`bg-gradient-to-r ${getProgressColor(waterIntake, dailyGoals.water)} h-4 rounded-full transition-all duration-500 shadow-lg`}
                      style={{ width: `${Math.min((waterIntake / dailyGoals.water) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2 text-sm font-semibold text-gray-600">
                    {Math.round((waterIntake / dailyGoals.water) * 100)}%
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => addWater(250)}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors transform hover:scale-105"
                  >
                    +250ml
                  </button>
                  <button 
                    onClick={() => addWater(500)}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors transform hover:scale-105"
                  >
                    +500ml
                  </button>
                </div>
              </div>

              {/* Calorias */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-orange-100 rounded-2xl">
                      <Flame className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Calorias</h3>
                      <p className="text-sm text-gray-500">{caloriesConsumed} / {dailyGoals.calories}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`bg-gradient-to-r ${getProgressColor(caloriesConsumed, dailyGoals.calories)} h-4 rounded-full transition-all duration-500 shadow-lg`}
                      style={{ width: `${Math.min((caloriesConsumed / dailyGoals.calories) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2 text-sm font-semibold text-gray-600">
                    {Math.round((caloriesConsumed / dailyGoals.calories) * 100)}%
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => addCalories(100)}
                    className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-xl text-sm font-bold hover:bg-orange-700 transition-colors transform hover:scale-105"
                  >
                    +100
                  </button>
                  <button 
                    onClick={() => addCalories(250)}
                    className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-xl text-sm font-bold hover:bg-orange-700 transition-colors transform hover:scale-105"
                  >
                    +250
                  </button>
                </div>
              </div>

              {/* Treino do Dia */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-green-100 rounded-2xl">
                    <Dumbbell className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Treino Hoje</h3>
                    <p className="text-sm text-gray-500">{weeklyWorkouts[currentDay - 1]?.type}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duração:</span>
                    <span className="font-semibold">{weeklyWorkouts[currentDay - 1]?.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Calorias:</span>
                    <span className="font-semibold">{weeklyWorkouts[currentDay - 1]?.calories} kcal</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveWorkout(1)}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors transform hover:scale-105 shadow-lg"
                >
                  Iniciar Treino
                </button>
              </div>

              {/* Refeições do Dia */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-purple-100 rounded-2xl">
                    <Utensils className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Refeições</h3>
                    <p className="text-sm text-gray-500">Plano personalizado</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {weeklyMeals[currentDay - 1]?.meals.slice(0, 2).map((meal, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700 font-medium">{meal}</span>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 font-semibold">+{weeklyMeals[currentDay - 1]?.meals.length - 2} mais refeições</p>
                </div>
                
                <button 
                  onClick={() => setActiveTab('meals')}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-colors transform hover:scale-105 shadow-lg"
                >
                  Ver Cardápio
                </button>
              </div>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-10 h-10" />
                  <div>
                    <h3 className="font-bold text-xl">Peso Perdido</h3>
                    <p className="text-3xl font-bold">3.2 kg</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">Meta: 8 kg em 60 dias</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="w-10 h-10" />
                  <div>
                    <h3 className="font-bold text-xl">Treinos Completos</h3>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">Este mês</p>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-10 h-10" />
                  <div>
                    <h3 className="font-bold text-xl">Tempo Ativo</h3>
                    <p className="text-3xl font-bold">8h 45m</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">Esta semana</p>
              </div>
            </div>
          </div>
        );

      case 'workouts':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-100 rounded-2xl">
                  <Dumbbell className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Plano de Treinos Semanal</h2>
                  <p className="text-gray-600 text-lg">Novos exercícios liberados diariamente</p>
                </div>
              </div>
              
              <div className="grid gap-6">
                {weeklyWorkouts.map((workout) => (
                  <div 
                    key={workout.day}
                    className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                      workout.unlocked 
                        ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                          workout.unlocked ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'
                        }`}>
                          {workout.day}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-800">Dia {workout.day}</h3>
                          <p className="text-gray-600 text-lg">{workout.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {workout.unlocked ? (
                          <>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">⏱️ {workout.duration}</p>
                              <p className="text-sm text-gray-600">🔥 {workout.calories} kcal</p>
                            </div>
                            <button 
                              onClick={() => setActiveWorkout(workout.day)}
                              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Iniciar
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-500">Desbloqueie no dia {workout.day}</p>
                            <Lock className="w-6 h-6 text-gray-400" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'meals':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-green-100 rounded-2xl">
                  <Utensils className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Plano Alimentar Semanal</h2>
                  <p className="text-gray-600 text-lg">Desbloqueie novos cardápios a cada dia</p>
                </div>
              </div>
              
              <div className="grid gap-6">
                {weeklyMeals.map((dayPlan) => (
                  <div 
                    key={dayPlan.day}
                    className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                      dayPlan.unlocked 
                        ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                          dayPlan.unlocked ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
                        }`}>
                          {dayPlan.day}
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">Dia {dayPlan.day}</h3>
                      </div>
                      
                      {dayPlan.unlocked ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    
                    {dayPlan.unlocked ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dayPlan.meals.map((meal, index) => (
                          <div key={index} className="bg-white p-4 rounded-xl shadow-md border border-green-100">
                            <div className="text-center">
                              <div className="text-2xl mb-2">
                                {index === 0 ? '🌅' : index === 1 ? '☀️' : index === 2 ? '🌆' : '🌙'}
                              </div>
                              <h4 className="font-semibold text-gray-800 mb-1">
                                {index === 0 ? 'Café da Manhã' : index === 1 ? 'Almoço' : index === 2 ? 'Jantar' : 'Lanche'}
                              </h4>
                              <p className="text-sm text-gray-600">{meal}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">Desbloqueie no dia {dayPlan.day}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-yellow-100 rounded-2xl">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Conquistas</h2>
                  <p className="text-gray-600 text-lg">Desbloqueie medalhas e ganhe XP extra</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={achievement.id}
                      className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                        achievement.completed 
                          ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' 
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          achievement.completed ? 'bg-yellow-600' : 'bg-gray-400'
                        }`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-xl text-gray-800 mb-2">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                        {achievement.completed ? (
                          <div className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                            ✅ +{achievement.xp} XP
                          </div>
                        ) : (
                          <div className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full text-sm font-bold">
                            🔒 {achievement.xp} XP
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-purple-100 rounded-2xl">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Progresso e Estatísticas</h2>
                  <p className="text-gray-600 text-lg">Acompanhe sua evolução</p>
                </div>
              </div>
              
              {/* Gráfico de Progresso Semanal */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Progresso Semanal</h3>
                  <div className="space-y-4">
                    {[1,2,3,4,5,6,7].map(day => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                          {day}
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-white/20 rounded-full h-3">
                            <div 
                              className="bg-white h-3 rounded-full transition-all duration-500"
                              style={{ width: `${day <= currentDay ? Math.random() * 40 + 60 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm opacity-90">
                          {day <= currentDay ? '✅' : '⏳'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                      <Target className="w-10 h-10" />
                      <div>
                        <h3 className="font-bold text-lg">Meta Semanal</h3>
                        <p className="text-2xl font-bold">85%</p>
                        <p className="text-sm opacity-90">6 de 7 objetivos</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                      <Flame className="w-10 h-10" />
                      <div>
                        <h3 className="font-bold text-lg">Calorias Queimadas</h3>
                        <p className="text-2xl font-bold">2,450</p>
                        <p className="text-sm opacity-90">Esta semana</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas Detalhadas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
                  <div className="text-sm text-gray-600">Dias Consecutivos</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                  <div className="text-sm text-gray-600">Treinos Completos</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">48</div>
                  <div className="text-sm text-gray-600">Refeições Saudáveis</div>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">18L</div>
                  <div className="text-sm text-gray-600">Água Consumida</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header com Stats do Usuário */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Olá, Maria! 👋</h1>
              <p className="text-blue-100 text-lg">Dia {currentDay} da sua jornada de transformação</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm font-semibold">Nível</span>
                </div>
                <div className="text-3xl font-bold">{userLevel}</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-orange-300" />
                  <span className="text-sm font-semibold">XP</span>
                </div>
                <div className="text-3xl font-bold">{userXP}</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Flame className="w-6 h-6 text-red-300" />
                  <span className="text-sm font-semibold">Sequência</span>
                </div>
                <div className="text-3xl font-bold">{streak}</div>
              </div>
            </div>
          </div>
          
          {/* Barra de Progresso XP */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-3">
              <span className="font-semibold">Progresso para Nível {userLevel + 1}</span>
              <span className="font-semibold">{userXP}/1000 XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${(userXP / 1000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {[
              { id: 'home', label: 'Início', icon: Home },
              { id: 'workouts', label: 'Treinos', icon: Dumbbell },
              { id: 'meals', label: 'Refeições', icon: Utensils },
              { id: 'achievements', label: 'Conquistas', icon: Trophy },
              { id: 'progress', label: 'Progresso', icon: BarChart3 }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}