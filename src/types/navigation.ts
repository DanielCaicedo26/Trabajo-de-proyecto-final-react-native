/**
 * Tipos centralizados para navegación en la aplicación
 * Define todos los parámetros de rutas del Stack Navigator
 */

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Tipos de datos compartidos
export interface InfoMultaItem {
  icon: string;
  texto: string;
  valor: string;
}

export interface Infraccion {
  id?: string | number;
  tipo?: string;
  typeInfractionName?: string;
  type?: string;
  descripcion?: string;
  observations?: string;
  description?: string;
  fechaTexto?: string;
  date?: string;
  dateInfraction?: string;
  fecha?: string;
  consulta?: string;
  infoMulta?: InfoMultaItem[];
  monto?: string | number;
  valor?: number;
  amount?: number;
  total?: number;
  fechaMax?: string;
  dueDate?: string;
  fecha_max?: string;
  number?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  userId?: string | number;
}

export interface Ley {
  id: number;
  titulo: string;
  descripcion: string;
  numero: string;
  fecha: string;
}

export interface SmdlvData {
  valor: number;
  anio: number;
  descripcion?: string;
}

// Definición de parámetros para cada pantalla
export type RootStackParamList = {
  Bienvenida: undefined;
  Multas: undefined;
  MultasResultado: {
    multas: Infraccion[];
  };
  DetalleInfraccion: {
    infraccion: Infraccion;
  };
  AcuerdoPago: undefined;
  CodigoConvivencia: undefined;
  DetalleLey: {
    ley: Ley;
  };
  ConsultaSmlv: undefined;
  DetalleSmlv: {
    smdlv: SmdlvData;
  };
};

// Tipos de navegación para cada pantalla
export type BienvenidaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Bienvenida'>;
export type MultasNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Multas'>;
export type MultasResultadoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MultasResultado'>;
export type DetalleInfraccionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetalleInfraccion'>;
export type AcuerdoPagoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AcuerdoPago'>;
export type CodigoConvivenciaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CodigoConvivencia'>;
export type DetalleLeyNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetalleLey'>;
export type ConsultaSmlvNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ConsultaSmlv'>;
export type DetalleSmlvNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetalleSmlv'>;

// Tipos de route para cada pantalla
export type BienvenidaRouteProp = RouteProp<RootStackParamList, 'Bienvenida'>;
export type MultasRouteProp = RouteProp<RootStackParamList, 'Multas'>;
export type MultasResultadoRouteProp = RouteProp<RootStackParamList, 'MultasResultado'>;
export type DetalleInfraccionRouteProp = RouteProp<RootStackParamList, 'DetalleInfraccion'>;
export type AcuerdoPagoRouteProp = RouteProp<RootStackParamList, 'AcuerdoPago'>;
export type CodigoConvivenciaRouteProp = RouteProp<RootStackParamList, 'CodigoConvivencia'>;
export type DetalleLeyRouteProp = RouteProp<RootStackParamList, 'DetalleLey'>;
export type ConsultaSmlvRouteProp = RouteProp<RootStackParamList, 'ConsultaSmlv'>;
export type DetalleSmlvRouteProp = RouteProp<RootStackParamList, 'DetalleSmlv'>;

// Tipo genérico para cualquier navegación (útil en hooks compartidos)
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Props completos para componentes de pantalla
export interface BienvenidaScreenProps {
  navigation: BienvenidaNavigationProp;
  route: BienvenidaRouteProp;
}

export interface MultasScreenProps {
  navigation: MultasNavigationProp;
  route: MultasRouteProp;
}

export interface MultasResultadoScreenProps {
  navigation: MultasResultadoNavigationProp;
  route: MultasResultadoRouteProp;
}

export interface DetalleInfraccionScreenProps {
  navigation: DetalleInfraccionNavigationProp;
  route: DetalleInfraccionRouteProp;
}

export interface AcuerdoPagoScreenProps {
  navigation: AcuerdoPagoNavigationProp;
  route: AcuerdoPagoRouteProp;
}

export interface CodigoConvivenciaScreenProps {
  navigation: CodigoConvivenciaNavigationProp;
  route: CodigoConvivenciaRouteProp;
}

export interface DetalleLeyScreenProps {
  navigation: DetalleLeyNavigationProp;
  route: DetalleLeyRouteProp;
}

export interface ConsultaSmlvScreenProps {
  navigation: ConsultaSmlvNavigationProp;
  route: ConsultaSmlvRouteProp;
}

export interface DetalleSmlvScreenProps {
  navigation: DetalleSmlvNavigationProp;
  route: DetalleSmlvRouteProp;
}
