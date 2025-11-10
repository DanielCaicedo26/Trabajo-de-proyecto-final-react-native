import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated, StatusBar, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/FinesScreenStyles';
import { useNavigation } from '@react-navigation/native';
import useFines from '../hooks/useFines';
import { MultasNavigationProp } from '../types/navigation';

const FinesScreen: React.FC = () => {
  const navigation = useNavigation<MultasNavigationProp>();
  const {
    tipoDocumento,
    setTipoDocumento,
    numeroDocumento,
    setNumeroDocumento,
    acceptedTerms,
    setAcceptedTerms,
    showTermsModal,
    setShowTermsModal,
    loading,
    error,
    handleConsultarMultas,
    resetTimer,
    timerRef,
  } = useFines(navigation);
  const [isButtonPressed, setIsButtonPressed] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);
  // Animated values
  const logoAnim = useRef(new Animated.Value(0)).current; // 0 -> hidden, 1 -> visible
  const cardAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const checkboxScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    resetTimer();
    // Entry animations
    Animated.sequence([
      Animated.timing(logoAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(cardAnim, { toValue: 1, duration: 500, useNativeDriver: true })
    ]).start();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // The query logic is now in the useFines hook: use handleConsultarMultas() from the hook

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: 'https://i.ibb.co/wZbZttV5/Whats-App-Image-2025-01-07-at-3-26-56-PM-2.png' }}
          style={styles.backgroundImage}
          blurRadius={4}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
              <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#2E8B57" translucent />
                {/* Search bar removed by request */}
                <Animated.View style={[styles.logoContainer, {
                  opacity: logoAnim,
                  transform: [{ translateY: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
                }]}
                >
                  <View style={styles.logoWrapper}>
                    <Image
                      source={require('../img/image 6.png')}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.title}>Fines Review</Text>
                </Animated.View>
                <Animated.View style={[styles.card, {
                  opacity: cardAnim,
                  transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }]
                }]}
                >
                  <Text style={styles.subtitle}>View Infraction</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Document Type</Text>
                    <Picker
                      selectedValue={tipoDocumento}
                      style={[
                        styles.searchBar,
                        focusedInput === 'picker' && styles.inputFocused
                      ]}
                      onValueChange={(itemValue) => setTipoDocumento(itemValue)}
                      onFocus={() => setFocusedInput('picker')}
                      onBlur={() => setFocusedInput(null)}
                    >
                      <Picker.Item label="Select Your Document Type" value="" />
                      <Picker.Item label="Citizenship Card" value="cc" />
                      <Picker.Item label="Identity Card" value="ti" />
                      <Picker.Item label="Foreign ID Card" value="ce" />
                    </Picker>
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Document Number</Text>
                    <TextInput
                      style={[
                        styles.searchBar,
                        focusedInput === 'document' && styles.inputFocused
                      ]}
                      placeholder="Enter Your Document Number"
                      placeholderTextColor="#000000ff"
                      value={numeroDocumento}
                      onChangeText={setNumeroDocumento}
                      keyboardType="numeric"
                      onFocus={() => setFocusedInput('document')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                    // checkbox animation
                    Animated.sequence([
                      Animated.timing(checkboxScale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
                      Animated.timing(checkboxScale, { toValue: 1.05, duration: 120, useNativeDriver: true }),
                      Animated.timing(checkboxScale, { toValue: 1, duration: 100, useNativeDriver: true })
                    ]).start();
                    setAcceptedTerms(prev => !prev);
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                      <Animated.View style={[styles.checkbox, acceptedTerms ? styles.checkboxChecked : null, { transform: [{ scale: checkboxScale }] }]}>
                        {acceptedTerms ? <Text style={{ color: '#fff', fontWeight: '700' }}>✓</Text> : null}
                      </Animated.View>
                      <TouchableOpacity onPress={() => setShowTermsModal(true)} style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#34495e', textDecorationLine: 'underline' }}>I accept terms and conditions</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showTermsModal}
                    onRequestClose={() => setShowTermsModal(false)}
                  >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
                      <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 18, maxHeight: '80%' }}>
                        <ScrollView>
                          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>Terms and Conditions</Text>
                          <Text style={{ marginBottom: 12 }}>
                            Here are the terms and conditions. You can paste the actual text or a long summary that the user must accept before continuing. Make sure to include relevant information such as data usage, liability, and legal references.
                          </Text>
                          <Text style={{ marginBottom: 12 }}>
                            1. Use of information: The user agrees that the data provided will be used to query infractions in the database.
                          </Text>
                          <Text style={{ marginBottom: 12 }}>
                            2. Privacy: Data will not be shared with third parties without consent.
                          </Text>
                          <Text style={{ marginBottom: 12 }}>
                            3. Limitation of liability: The platform is not responsible for errors in the source data.
                          </Text>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
                          <Pressable onPress={() => setShowTermsModal(false)} style={{ marginRight: 12 }}>
                            <Text style={{ color: '#666' }}>Close</Text>
                          </Pressable>
                          <Pressable onPress={() => { setAcceptedTerms(true); setShowTermsModal(false); }}>
                            <Text style={{ color: '#01763C', fontWeight: '700' }}>Accept</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{error}</Text> : null}
                  <Animated.View style={{ width: '100%', transform: [{ scale: buttonScale }] }}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        isButtonPressed && styles.buttonPressed,
                        !acceptedTerms && styles.buttonDisabled
                      ]}
                      onPressIn={() => {
                        setIsButtonPressed(true);
                        Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: true }).start();
                      }}
                      onPressOut={() => {
                        setIsButtonPressed(false);
                        Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
                      }}
                      onPress={handleConsultarMultas}
                      activeOpacity={0.8}
                      disabled={loading || !acceptedTerms}
                    >
                      <Text style={styles.buttonText}>{loading ? 'Checking...' : 'Check Fines'}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FinesScreen;
