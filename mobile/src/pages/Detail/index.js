import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import  * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import s from './styles'

export default function Detail(){
    const navigation = useNavigation()
    const route = useRoute()

    const incident = route.params.incident
    const message = `Olá ${incident.name}, estou em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}`

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return(
        <View style={s.container}>
            <View style={s.header}>
                <Image source={logoImg} />

                <TouchableOpacity style={s.detailsButton} onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={s.incident}>
                <Text style={[s.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={s.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={s.incidentProperty}>Caso:</Text>
                <Text style={s.incidentValue}>{incident.title}</Text>

                <Text style={s.incidentProperty}>VALOR</Text>
                <Text style={s.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}
                </Text>
            </View>

            <View style={s.contactBox}>
                <Text style={s.heroTitle}>Salve o dia!</Text>
                <Text style={s.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={s.heroDescription}>Entre em contato:</Text>
                <View style={s.actions}>
                    <TouchableOpacity style={s.action} onPress={sendWhatsapp}>
                        <Text style={s.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={s.action} onPress={sendMail}>
                        <Text style={s.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}