import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import styles from '../styles/DetalleLeyScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import useDetalleLey from '../hooks/useDetalleLey';

const DetalleLeyScreen = ({ navigation, route }) => {
  const leyFromRoute = route?.params?.ley;
  const { ley: leyFormatted, resetTimer } = useDetalleLey(navigation, leyFromRoute);
  const ley = leyFormatted || { titulo: '', descripcion: '', textoCompleto: '', multa: null, articulos: null };

  return (
    <Pressable onPress={resetTimer} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#01763C" />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text" size={32} color="#01763C" />
              </View>
              <Text style={styles.titulo}>{ley.titulo}</Text>
            </View>

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentCard}>
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.descripcion}>{ley.descripcion}</Text>

                <Text style={styles.sectionTitle}>Texto Completo de la Ley</Text>
                <Text style={styles.textoCompleto}>{ley.textoCompleto}</Text>

                {ley.multa && (
                  <>
                    <Text style={styles.sectionTitle}>Multa</Text>
                    <Text style={styles.multa}>{ley.multa}</Text>
                  </>
                )}

                {ley.articulos && (
                  <>
                    <Text style={styles.sectionTitle}>Artículos Relacionados</Text>
                    <Text style={styles.articulos}>{ley.articulos}</Text>
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default DetalleLeyScreen;